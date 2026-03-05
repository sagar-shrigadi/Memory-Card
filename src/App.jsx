import { useState, useEffect } from "react";
import "./App.css";
import CardContainer from "./component/CardContainer";

function App() {
  const [pokemonUrlList, setPokemonUrlList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=18&offset=${Math.random() * (1000 - 1) + 1}`,
        );
        const json = await responce.json();

        const pokemonUrls = json.results.map((item) => item.url);
        setPokemonUrlList(pokemonUrls);
      } catch (error) {
        console.log("html error while fetching", error);
      }
    };
    fetchData();
  }, []);
  // console.log(pokemonUrlList);
  return <>{<CardContainer pokemonList={pokemonUrlList}></CardContainer>}</>;
}

export default App;
