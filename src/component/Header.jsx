import "../styles/Header.css";
export default function Header({ score, highestScore }) {
  return (
    <header className="header">
      <h1>
        PoKéMoN <br />
        Memory Game
      </h1>

      <div className="scoreboard">
        <p>
          <span>Highest Score: </span> {highestScore}
        </p>
        <p>
          <span>Score: </span> {score}
        </p>
      </div>
    </header>
  );
}
