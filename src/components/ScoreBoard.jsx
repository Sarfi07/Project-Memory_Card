export default function ScoreBoard({ currentScore, bestScore, attemptsLeft }) {
  return (
    <div id="scoreBoard">
      <div id="currentScore">
        <span>Current Score</span>: {currentScore}
      </div>
      <div id="bestScore">
        <span>Best Score</span>: {bestScore}
      </div>
      <div id="attemptsLeft">
        <span>Attempts Left</span>: {attemptsLeft}
      </div>
    </div>
  );
}
