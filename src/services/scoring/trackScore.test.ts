import KnowledgeTracker from './trackScore'; // Adjust path as necessary
import { getDatabase, ref, set, get } from 'firebase/database';
import { calculateKnowledgeScore } from './scoreCalculator'; // Assuming this is a utility function you have

jest.mock('firebase/database'); // Mocking Firebase methods

// Mock the calculateKnowledgeScore function
jest.mock('./scoreCalculator', () => ({
    calculateKnowledgeScore: jest.fn(),
}));

describe('KnowledgeTracker', () => {
    let knowledgeTracker: KnowledgeTracker;

    beforeEach(() => {
        knowledgeTracker = new KnowledgeTracker();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should initialize player tracking if player does not exist', async () => {
        const mockGet = get as jest.Mock;
        const playerID = 'player1';
        
        // Mock Firebase to simulate player not existing
        mockGet.mockResolvedValueOnce({
            exists: jest.fn().mockReturnValue(false),
        });

        await knowledgeTracker.initializePlayerTracking(playerID);

        // Check if set() was called to initialize the player's data
        expect(set).toHaveBeenCalledWith(
            ref(getDatabase(), `knowledgeScores/${playerID}`),
            {}
        );
    });

    test('should update knowledge score correctly', async () => {
        const mockGet = get as jest.Mock;
        const mockSet = set as jest.Mock;
        const question = 'What is 2 + 2?';
        const guesser = { id: 'player1' };
        const answerer = { id: 'player2' };
        const guess = '4';
        const correctAnswer = '4';
        
        // Mock Firebase to simulate existing score data
        mockGet.mockResolvedValueOnce({
            exists: jest.fn().mockReturnValue(true),
            val: jest.fn().mockReturnValue({
                totalGuesses: 0,
                correctGuesses: 0,
                accuracyPercentage: 0,
            }),
        });

        // Mock calculateKnowledgeScore to return true (correct guess)
        (calculateKnowledgeScore as jest.Mock).mockResolvedValue(true);

        await knowledgeTracker.updateKnowledgeScore(question, guesser, answerer, guess, correctAnswer);

        const updatedScores = {
            totalGuesses: 1,
            correctGuesses: 1,
            accuracyPercentage: 100,
        };

        // Verify that set() was called with updated scores
        expect(mockSet).toHaveBeenCalledWith(
            ref(getDatabase(), `knowledgeScores/${guesser.id}/${answerer.id}`),
            updatedScores
        );
    });

    test('should get knowledge score for a specific guesser and answerer', async () => {
        const mockGet = get as jest.Mock;
        const guesserID = 'player1';
        const answererID = 'player2';

        // Mock the Firebase response to return a score
        mockGet.mockResolvedValueOnce({
            exists: jest.fn().mockReturnValue(true),
            val: jest.fn().mockReturnValue({
                totalGuesses: 1,
                correctGuesses: 1,
                accuracyPercentage: 100,
            }),
        });

        const score = await knowledgeTracker.getKnowledgeScore(guesserID, answererID);

        expect(score).toEqual({
            totalGuesses: 1,
            correctGuesses: 1,
            accuracyPercentage: 100,
        });
    });

    test('should load knowledge scores for a player', async () => {
        const mockGet = get as jest.Mock;
        const playerID = 'player1';

        // Mock Firebase response with existing data
        mockGet.mockResolvedValueOnce({
            exists: jest.fn().mockReturnValue(true),
            val: jest.fn().mockReturnValue({
                player2: {
                    totalGuesses: 2,
                    correctGuesses: 2,
                    accuracyPercentage: 100,
                },
            }),
        });

        await knowledgeTracker.loadKnowledgeScores(playerID);

        // Check if the scores are loaded correctly into the class
        expect(knowledgeTracker['knowledgeScores'][playerID]).toEqual({
            player2: {
                totalGuesses: 2,
                correctGuesses: 2,
                accuracyPercentage: 100,
            },
        });
    });

    test('should serialize player scores', async () => {
        const mockGet = get as jest.Mock;
        const playerID = 'player1';

        // Mock Firebase response with existing data
        mockGet.mockResolvedValueOnce({
            exists: jest.fn().mockReturnValue(true),
            val: jest.fn().mockReturnValue({
                player2: {
                    totalGuesses: 2,
                    correctGuesses: 2,
                    accuracyPercentage: 100,
                },
            }),
        });

        const serialized = await knowledgeTracker.serializeScores(playerID);

        expect(serialized).toBe('{"player2":{"totalGuesses":2,"correctGuesses":2,"accuracyPercentage":100}}');
    });

    test('should deserialize player scores', async () => {
        const mockSet = set as jest.Mock;
        const playerID = 'player1';
        const serializedScores = '{"player2":{"totalGuesses":2,"correctGuesses":2,"accuracyPercentage":100}}';

        await knowledgeTracker.deserializeScores(playerID, serializedScores);

        // Verify if the deserialized scores were set in Firebase and the class
        expect(mockSet).toHaveBeenCalledWith(
            ref(getDatabase(), `knowledgeScores/${playerID}`),
            JSON.parse(serializedScores)
        );

        expect(knowledgeTracker['knowledgeScores'][playerID]).toEqual({
            player2: {
                totalGuesses: 2,
                correctGuesses: 2,
                accuracyPercentage: 100,
            },
        });
    });
});
