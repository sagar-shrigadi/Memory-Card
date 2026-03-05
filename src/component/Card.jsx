import { useState } from "react";
import "../styles/Card.css";
export default function Card({ pokemon, shuffleCards }) {
  const [count, setCount] = useState(0);

  function handleClick() {
    if (count === 0) {
      setCount((c) => c + 1);
      shuffleCards();
    } else {
      alert("game reset!");
    }
  }

  return (
    <article className="card" onClick={handleClick}>
      <img
        alt={`${pokemon.name}'s Official Artwork`}
        src={pokemon.pic}
        width={275}
        height={275}
        className="pokemon-img"
      ></img>
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <p>{count}</p>
    </article>
  );
}
