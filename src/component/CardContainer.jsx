import { useState, useEffect } from "react";
import "../styles/cardContainer.css";
import Card from "./Card";
export default function CardContainer({ pokemonList }) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const responce = await Promise.all(
        pokemonList.map((pokemon) => fetch(pokemon)),
      );
      const jsonList = await Promise.all(responce.map((res) => res.json()));
      const requiredData = jsonList.map((pokemon) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          pic: pokemon.sprites.other["official-artwork"].front_default,
        };
      });
      // console.log(requiredData);
      setPokemons(requiredData);
    };
    fetchAll();
  }, [pokemonList]);

  return (
    <section className="card-container">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon}></Card>
      ))}
    </section>
  );
}
