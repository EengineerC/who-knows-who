export interface Player {
  id: string;
  name: string;
}

export interface Question {
  question: string;
  type: 'memory' | 'preference' | 'habit' | 'interest';
}

export interface PlayerGuess {
  player: Player;
  answer: string;
} 