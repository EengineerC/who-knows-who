<script lang="ts">
    import { goto } from '$app/navigation';
	import { addPlayer, initializeGameDatabase } from '../../firebase/firebase';


    let gameCode = '';
    let playerName = '';
    let error = '';

    async function handleSubmit() {
        // Validate inputs
        if (!gameCode.trim()) {
            error = 'Game Code is required';
            return;
        }
        if (!playerName.trim()) {
            error = 'Player Name is required';
            return;
        }

        try {
            // Initialize the game database structure if it doesn't exist
            await initializeGameDatabase(gameCode);

            // Add the player to the game
            await addPlayer(gameCode, playerName);

            // Save game details in local storage
            localStorage.setItem('gameCode', gameCode);
            localStorage.setItem('playerName', playerName);

            document.cookie = `gameCode=${gameCode}; path=/; SameSite=Strict`;
            document.cookie = `playerName=${playerName}; path=/; SameSite=Strict`;


            // Redirect to the main game page
            await goto(`/play/${gameCode}`);
        } catch (err) {
            console.error('Error entering game:', err);
            error = 'Failed to enter game. Please try again.';
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 class="text-2xl font-bold mb-6 text-center">Enter Game</h1>
        
        {#if error}
            <div class="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error}
            </div>
        {/if}

        <form on:submit|preventDefault={handleSubmit}>
            <div class="mb-4">
                <label for="gameCode" class="block text-gray-700 font-bold mb-2">
                    Game Code
                </label>
                <input 
                    type="text" 
                    id="gameCode" 
                    bind:value={gameCode}
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Game Code"
                    required
                />
            </div>

            <div class="mb-6">
                <label for="playerName" class="block text-gray-700 font-bold mb-2">
                    Player Name
                </label>
                <input 
                    type="text" 
                    id="playerName" 
                    bind:value={playerName}
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Your Name"
                    required
                />
            </div>

            <button 
                type="submit" 
                class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Enter Game
            </button>
        </form>
    </div>
</div>