<script lang="ts">
    import { goto } from '$app/navigation';

    function handleStartGame() {
        goto('/enter');
    }
</script>

<div class="min-h-screen flex flex-col items-center bg-gray-100 py-8">
    <!-- How to Play Description Section -->
    <div class="bg-white p-6 rounded-lg shadow-md max-w-3xl text-center mb-8">
        <h1 class="text-3xl font-bold mb-4">How to Play "Who Knows Who"</h1>
        <p class="text-gray-700 mb-4">
            Playing "Who Knows Who" is simple and fun! Follow these steps to get started and enjoy the game:
        </p>
        <ol class="list-decimal list-inside text-gray-700 text-left">
            <li class="mb-2">Enter the game using a unique game code provided by the host.</li>
            <li class="mb-2">Input your name to join the game and track your performance.</li>
            <li class="mb-2">Each round, the game generates a new question based on a hidden answer chosen by the AI.</li>
            <li class="mb-2">Try to guess the answer by discussing and collaborating with other players.</li>
            <li class="mb-2">Submit your guess and see how well you know your fellow players!</li>
            <li>The AI will grade the guesses and update the score after every round.</li>
        </ol>
        <p class="text-gray-700 mt-4">
            The goal is to learn more about each other and see who can guess the most answers correctly. Have fun and enjoy getting to know your friends better!
        </p>
    </div>

    <!-- Visuals or Example Section -->
    <div class="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full mb-8">
        <h2 class="text-2xl font-bold mb-4 text-center">Example Round</h2>
        <p class="text-gray-700 mb-4 text-center">
            Imagine the question is: "What is Alex's favorite type of food?" The hidden answer could be "Sushi." Everyone submits their guesses, and the AI grades them based on accuracy. The scores are then updated in real-time!
        </p>
    </div>

    <!-- Player Reminder Section -->
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-6 text-center">Ready to Play?</h2>
        <p class="text-gray-700 mb-4 text-center">
            Make sure you have a valid game code and are ready to submit your best guesses. Good luck!
        </p>
		<p>Ps yes i had chat gpt write this version of the page lol</p>
        <button 
            class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            on:click={handleStartGame}
        >
            Go to Game Entry
        </button>
    </div>
</div>
