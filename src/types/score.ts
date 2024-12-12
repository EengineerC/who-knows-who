export interface PlayerKnowledgeScores {
    [playerID: string]: {
        [otherPlayerID: string]: {
            totalGuesses: number;
            correctGuesses: number;
            accuracyPercentage: number;
        }
    }
}