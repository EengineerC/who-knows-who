<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { ref, remove } from 'firebase/database';
    import { db } from '../../../firebase/firebase';
    import GraphScore from "../../GraphScore.svelte";

    export let data: {
        question?: string;
        questionType?: string;
        answerer?: string;
    } = {};
    export let form: {
        success?: boolean;
        score?: number;
        error?: string;
    } = {};

    let gameCode = '';
    let playerName = '';
    let formSubmitted = false;
    let submitting = false;
    let score: number | null = null;
    let isCurrentPlayerAnswerer = false;

    onMount(() => {
        gameCode = localStorage.getItem('gameCode') || '';
        playerName = localStorage.getItem('playerName') || '';
        
        // Check if current player is the answerer
        isCurrentPlayerAnswerer = playerName === data.answerer;
    });

    $: {
        if (form?.success) {
            formSubmitted = true;
            score = form.score ?? null;
        }
    }

    function resetForm() {
        formSubmitted = false;
        score = null;
        submitting = false;
    }

    async function endGame() {
        try {
            // Remove the game from the database
            const gameRef = ref(db, `gamecode/${gameCode}`);
            await remove(gameRef);

            // Clear local storage
            localStorage.removeItem('gameCode');
            localStorage.removeItem('playerName');

            // Redirect to start page
            await goto('/start');
        } catch (error) {
            console.error('Error ending game:', error);
            alert('Failed to end game. Please try again.');
        }
    }
</script>

<div class="container1">
    {#if form?.error}
        <div class="alert alert-error mb-6">
            {form.error}
        </div>
    {/if}

    {#if !formSubmitted}
        <div class="question-container mb-6">
            <h1 class="text">Welcome, {playerName}!</h1>
            <h3 class="text">{data.question}</h3>

            <form method="POST">
                <div class="mb-6">
                    <textarea 
                        id="answer" 
                        name="answer" 
                        rows="4" 
                        required
                        class="textarea"
                        placeholder="Your answer"
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    disabled={submitting}
                    class="submit-btn"
                >
                    {submitting ? 'Submitting...' : 'Submit Answer'}
                </button>
            </form>
        </div>
    {:else}
        <div class="result-container bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 text-center">
            <h2 class="text-3xl font-bold mb-6">
                {score === 1 ? 'Correct!' : 'Incorrect'}
            </h2>
            <p class="text-lg text-gray-600 mb-4">
                {score === 1 
                    ? 'You knew it!' 
                    : 'You might need to learn more about this person.'}
            </p>
            <button 
                on:click={resetForm}
                class="retry-btn"
            >
                Try Another Question
            </button>

        </div>
    {/if}

    {#if gameCode}
        <GraphScore gameCode={gameCode}/>
    {/if}
    <button 
    on:click={endGame}
    class="end-game-btn"
>
    End Game
</button>
</div>

<style>
    .alert {
        background-color: #fdd6d6;
        border: 1px solid #fbb1b1;
        color: #d8000c;
        padding: 16px;
        border-radius: 8px;
        font-size: 16px;
        margin-bottom: 16px;
    }

    .alert-error {
        background-color: #ffe5e5;
    }

    .textarea {
        width: 100%;
        padding: 0px;
        border-radius: 8px;
        border: 1px solid #d1d5db;
        font-size: 16px;
        transition: border-color 0.2s ease;
        resize: vertical;
    }

    .textarea:focus {
        border-color: #3b82f6;
        outline: none;
    }

    .submit-btn {
        background-color: #0c62a0;
        color: white;
        font-weight: bold;
        padding: 12px 24px;
        border-radius: 8px;
        width: 100%;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 16px;
        font-size: 16px;
    }

    .submit-btn:disabled {
        background-color: #93c5fd;
        cursor: not-allowed;
    }

    .submit-btn:hover:not(:disabled) {
        background-color: #2563eb;
    }

    .end-game-btn {
        background-color: #b82c2c; /* Red color */
        color: white;
        font-weight: bold;
        padding: 12px 24px;
        border-radius: 8px;
        width: 20%;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 16px;
        font-size: 16px;
    }

    .end-game-btn:hover {
        background-color: #b91c1c; /* Darker red on hover */
    }
</style>