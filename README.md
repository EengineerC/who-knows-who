# Who Knows Who

## Overview
**Who Knows Who** is an interactive game app that uses the Gemini AI system to generate fun and personalized questions. In each round, a random player is chosen as the subject of the guessing game. Other players try to match their answers to the subject's answers, with Gemini judging how well the guesses align. The game is designed for engagement, fun, and learning about each other!

---

## Features
- **Question Generation:** Uses Gemini AI to create dynamic, personalized questions.
- **Random Player Selection:** Randomly selects a player as the subject for each round.
- **Answer Matching:** Compares guesses to the subject's answers using Gemini for fairness and accuracy.
- **Score Tracking:** Tracks player performance to enhance competitiveness.
- **Visuals:** Uses Chart.js to create a graph of how each player is doing 

---

## Installation and Setup

### Prerequisites
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Steps
1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd who-knows-who
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at:
   ```
   http://localhost:3000
   ```

---

## Game Flow
1. **Start a Game:** Players join by entering a game code.
2. **Random Player Selection:** A player is randomly selected as the answerer for the round.
3. **Question Generation:** Gemini generates a question specific to the answerer.
4. **Guessing Phase:** Other players submit their guesses.
5. **Answer Evaluation:** Gemini compares the guesses to the answerer's answer and determines how close they match.
6. **Score Update:** Scores are updated and displayed for all players.

---

## Development Notes
- **Firebase Integration:** The app uses Firebase Realtime Database for player management, game state tracking, and score storage.
- **Gemini API:** Handles question generation and answer evaluation.
- **SvelteKit Framework:** The app is built using SvelteKit for a fast and reactive user experience.

---

## Contributing
We welcome contributions to improve **Who Knows Who**! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear messages.
4. Open a pull request to the main repository.

---

## License
None

---


