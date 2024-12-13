<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
	import { fetchScores } from '../firebase/firebase';

  interface PlayerKnowledgeScores {
    [playerID: string]: {
        [otherPlayerID: string]: {
            totalGuesses: number;
            correctGuesses: number;
            accuracyPercentage: number;
        }
    }
  }
 
  let chartCanvas: HTMLCanvasElement;
  let exampleData: PlayerKnowledgeScores = {};
  export let gameCode: string;

  onMount(async () => {
    try {
      exampleData = await fetchScores(gameCode);

    } catch (error) {
      console.error('Error fetching scores:', error);
    }
    const players = Object.keys(exampleData);

    const datasets = players.map((player, index) => {
      const playerAccuracies = players.map(target => {
        if (player === target) return 100;
        return exampleData[player][target].accuracyPercentage;
      });

      return {
        label: player,
        data: playerAccuracies,
        borderColor: `hsl(${index * 360 / players.length}, 70%, 50%)`,
        backgroundColor: `hsl(${index * 360 / players.length}, 70%, 50%)`,
        pointRadius: 6,
        tension: 0.1
      };
    });

    new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: players,
        datasets: datasets
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'How well each player knows each other player'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Accuracy Percentage'
            }
          },
        }
      }
    });
  });

</script>

<div class="chart-container">
  <canvas bind:this={chartCanvas}></canvas>
</div>

<style>
  .chart-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
</style>