import { Player } from "../../types/game";
import { calculateKnowledgeScore } from "./scoreCalculator";

// Types for knowledge tracking
interface PlayerKnowledgeScores {
    [playerID: string]: {
        [otherPlayerID: string]: {
            totalGuesses: number;
            correctGuesses: number;
            accuracyPercentage: number;
        }
    }
}

class KnowledgeTracker {
    private knowledgeScores: PlayerKnowledgeScores = {};

    // Initialize tracking for a player
    initializePlayerTracking(playerID: string) {
        if (!this.knowledgeScores[playerID]) {
            this.knowledgeScores[playerID] = {};
        }
    }

    // Update knowledge score after a guess
    async updateKnowledgeScore(
        question: string,
        guesser: Player, 
        answerer: Player, 
        guess: string, 
        correctAnswer: string
    ) {
        // Ensure players are tracked
        this.initializePlayerTracking(guesser.id);
        this.initializePlayerTracking(answerer.id);

        // If no existing tracking for this player-to-player relationship, initialize
        if (!this.knowledgeScores[guesser.id][answerer.id]) {
            this.knowledgeScores[guesser.id][answerer.id] = {
                totalGuesses: 0,
                correctGuesses: 0,
                accuracyPercentage: 0
            };
        }

        // Use existing calculateKnowledgeScore function to determine accuracy
        const isCorrect = await calculateKnowledgeScore(
            question, guesser, answerer, guess, correctAnswer
        );

        // Update tracking
        const playerScores = this.knowledgeScores[guesser.id][answerer.id];
        playerScores.totalGuesses++;
        
        if (isCorrect) {
            playerScores.correctGuesses++;
        }

        // Recalculate accuracy percentage
        playerScores.accuracyPercentage = 
            (playerScores.correctGuesses / playerScores.totalGuesses) * 100;
    }

    // Get knowledge score for a specific player-to-player relationship
    getKnowledgeScore(guesserID: string, answererID: string) {
        return this.knowledgeScores[guesserID]?.[answererID] || null;
    }

    // Get overall knowledge scores for a player
    getPlayerOverallKnowledgeScores(playerID: string) {
        return this.knowledgeScores[playerID] || {};
    }

    // Serialize scores for storage (e.g., database, local storage)
    serializeScores() {
        return JSON.stringify(this.knowledgeScores);
    }

    // Deserialize and load scores
    deserializeScores(serializedScores: string) {
        this.knowledgeScores = JSON.parse(serializedScores);
    }
}

export default KnowledgeTracker;