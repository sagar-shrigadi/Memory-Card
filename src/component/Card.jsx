export default function Card({ pokemon }) {
  return (
    <article className="card">
      <h2>Name: {pokemon.name}</h2>
      <img alt={`${pokemon.name}'s Official Artwork`} src={pokemon.pic}></img>
    </article>
  );
}
