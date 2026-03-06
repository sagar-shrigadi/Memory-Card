import "../styles/Card.css";
export default function Card({ pokemon, handleClick }) {
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
    </article>
  );
}
