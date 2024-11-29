import { generatePersonalQuestion } from '../ai/questionGenerator';
import { Player, Question, PlayerGuess } from '../../types/game';

function selectRandomPlayer(players: Player[]): Player {
  const randomIndex = Math.floor(Math.random() * players.length);
  return players[randomIndex];
}


interface GameRound {
  id: string;
  answerer: Player;
  question: Question;
  guesses: PlayerGuess[];
  status: 'pending' | 'active' | 'complete';
  startedAt: Date;
}

async function runGameRound(players: Player[]): Promise<GameRound> {
  if (players.length < 2) {
    throw new Error('At least 2 players required');
  }

  const answerer = selectRandomPlayer(players);
  const round: GameRound = {
    id: crypto.randomUUID(),
    answerer,
    question: await generatePersonalQuestion(answerer),
    status: 'pending',
    startedAt: new Date(),
    guesses: []
  };

  return round;
} 