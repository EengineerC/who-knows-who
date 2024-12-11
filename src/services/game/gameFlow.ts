import { generatePersonalQuestion } from './questionGenerator';
import { Player, Question, PlayerGuess } from '../../types/game';

function selectRandomPlayer(players: Player[]): Player {
  const randomIndex = Math.floor(Math.random() * players.length);
  return players[randomIndex];
}


interface GameRound {
  answerer: Player;
  question: Question;
  status: 'pending' | 'active' | 'complete';
}

async function runGameRound(players: Player[]): Promise<GameRound> {
  if (players.length < 2) {
    throw new Error('At least 2 players required');
  }
  const answerer = selectRandomPlayer(players);
  const round: GameRound = {
    answerer,
    question: await generatePersonalQuestion(answerer),
    status: 'pending',
  };
  return round;
} 