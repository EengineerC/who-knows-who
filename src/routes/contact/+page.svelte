<script lang="ts">
    export let data: {
        question?: string;
        questionType?: string;
    } = {};
    export let form: {
        success?: boolean;
        score?: number;
        error?: string;
    } = {};

    let formSubmitted = false;
    let submitting = false;
    let score: number | null = null;

    $: if (form?.success) {
        formSubmitted = true;
        score = form.score ?? null;
    }

    function resetForm() {
        formSubmitted = false;
        score = null;
    }
</script>

<svelte:head>
    <title>Personal Trivia Game</title>
    <meta name="description" content="Guess the personal trivia" />
</svelte:head>

<div class="container max-w-md mx-auto p-4">
    {#if form?.error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {form.error}
        </div>
    {/if}

    {#if !formSubmitted}
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 class="text-2xl font-bold mb-4">{data.question || 'Loading...'}</h1>
            <p class="text-sm text-gray-600 mb-4">Question Type: {data.questionType}</p>

            <form method="POST">
                <div class="mb-4">
                    <label 
                        for="answer" 
                        class="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Your Answer
                    </label>
                    <textarea 
                        id="answer" 
                        name="answer" 
                        rows="5" 
                        required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    disabled={submitting}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {submitting ? 'Submitting...' : 'Submit Answer'}
                </button>
            </form>
        </div>
    {:else}
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
            <h2 class="text-2xl font-bold mb-4">
                {score === 1 ? 'Correct!' : 'Incorrect'}
            </h2>
            <p class="mb-4">
                {score === 1 
                    ? 'You knew the insider detail!' 
                    : 'You might need to learn more about this person.'}
            </p>
            <button 
                on:click={resetForm}
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Try Another Question
            </button>
        </div>
    {/if}
</div>