import { useState, useEffect } from "react";
import "../styles/cardContainer.css";
import Card from "./Card";
export default function CardContainer({ pokemonList, updateScore }) {
  const [pokemons, setPokemons] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);

  function handleClick(id) {
    if (!clickedIds.includes(id)) {
      setClickedIds([...clickedIds, id]);
      updateScore();
      shuffleCards(pokemons);
    } else {
      alert("game reset!");
    }
  }

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

  //Fisher-Yates shuffle algorithm for shuffling cards on a click
  function shuffleCards(array) {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      //generates a random num betwwen i & 1
      const randomNum = Math.floor(Math.random() * (i + 1));

      // destructing to swap array[i]th element with array[randomNum] element
      [arrayCopy[i], arrayCopy[randomNum]] = [
        arrayCopy[randomNum],
        arrayCopy[i],
      ];
    }
    setPokemons(arrayCopy);
  }

  return (
    <section className="card-container">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          handleClick={() => handleClick(pokemon.id)}
        ></Card>
      ))}
    </section>
  );
}
