<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  interface PlayerKnowledgeScores {
    [playerID: string]: {
        [otherPlayerID: string]: {
            totalGuesses: number;
            correctGuesses: number;
            accuracyPercentage: number;
        }
    }
  }
 
  const exampleData: PlayerKnowledgeScores = {
    Alice: {
      Bob: { totalGuesses: 20, correctGuesses: 15, accuracyPercentage: 75 },
      Charlie: { totalGuesses: 20, correctGuesses: 12, accuracyPercentage: 60 },
      Diana: { totalGuesses: 20, correctGuesses: 10, accuracyPercentage: 50 },
      Ethan: { totalGuesses: 20, correctGuesses: 18, accuracyPercentage: 90 },
    },
    Bob: {
      Alice: { totalGuesses: 20, correctGuesses: 14, accuracyPercentage: 70 },
      Charlie: { totalGuesses: 20, correctGuesses: 16, accuracyPercentage: 80 },
      Diana: { totalGuesses: 20, correctGuesses: 11, accuracyPercentage: 55 },
      Ethan: { totalGuesses: 20, correctGuesses: 15, accuracyPercentage: 75 },
    },
    Charlie: {
      Alice: { totalGuesses: 20, correctGuesses: 10, accuracyPercentage: 50 },
      Bob: { totalGuesses: 20, correctGuesses: 12, accuracyPercentage: 60 },
      Diana: { totalGuesses: 20, correctGuesses: 14, accuracyPercentage: 70 },
      Ethan: { totalGuesses: 20, correctGuesses: 13, accuracyPercentage: 65 },
    },
    Diana: {
      Alice: { totalGuesses: 20, correctGuesses: 18, accuracyPercentage: 90 },
      Bob: { totalGuesses: 20, correctGuesses: 17, accuracyPercentage: 85 },
      Charlie: { totalGuesses: 20, correctGuesses: 15, accuracyPercentage: 75 },
      Ethan: { totalGuesses: 20, correctGuesses: 16, accuracyPercentage: 80 },
    },
    Ethan: {
      Alice: { totalGuesses: 20, correctGuesses: 19, accuracyPercentage: 95 },
      Bob: { totalGuesses: 20, correctGuesses: 18, accuracyPercentage: 90 },
      Charlie: { totalGuesses: 20, correctGuesses: 15, accuracyPercentage: 75 },
      Diana: { totalGuesses: 20, correctGuesses: 14, accuracyPercentage: 70 },
    },
  };
  let chartCanvas: HTMLCanvasElement;

  onMount(() => {
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
            text: 'Player Knowledge Scores Across Targets'
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