import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Cards from './components/Cards';
import ScoreBoard from './components/ScoreBoard';
import './styles/main.css';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCardsSet, setClickedCardsSet] = useState(new Set());
  const [attemptsLeft, setAttemptsLeft] = useState(12);

  // initialise cards display by calling an API

  function handleCardClick(cardId) {
    if (!clickedCardsSet.has(cardId)) {
      const newSet = new Set(clickedCardsSet);
      newSet.add(cardId);
      setClickedCardsSet(newSet);

      const newScore = currentScore + 1;
      setCurrentScore(newScore);

      const newBestScore = newScore > bestScore ? newScore : bestScore;
      setBestScore(newBestScore);
    }
    setClickedCardsSet(new Set([...clickedCardsSet, cardId]));
    const attemptsRemaining = attemptsLeft - 1;
    setAttemptsLeft(attemptsRemaining);
  }

  function restartGame() {
    setCurrentScore(0);
    setAttemptsLeft(12);
    setClickedCardsSet(new Set());
    console.log(clickedCardsSet);
  }

  if (attemptsLeft <= 0) {
    return (
      <div id="gameOver">
        <h1>GameOver</h1>
        <h2>Your Score: {currentScore}</h2>
        <h2>Best Score: {bestScore}</h2>
        <button onClick={restartGame} className="restartBtn">
          Restart
        </button>
      </div>
    );
  } else {
    return (
      /*  */
      <div id="mainContainer">
        <Header />
        <ScoreBoard
          currentScore={currentScore}
          bestScore={bestScore}
          attemptsLeft={attemptsLeft}
        />
        <Cards handleCardClick={handleCardClick} />
      </div>
    );
  }
}

export default App;
