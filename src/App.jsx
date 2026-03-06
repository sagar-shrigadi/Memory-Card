import { useState, useEffect } from "react";
import "./styles/reset.css";
import "./App.css";
import Header from "./component/Header";
import CardContainer from "./component/CardContainer";

function App() {
  const [pokemonUrlList, setPokemonUrlList] = useState([]);
  const [scoreboard, setScoreboard] = useState({
    score: 0,
    highestScore: 0,
  });

  function updateScore() {
    setScoreboard({
      ...scoreboard,
      score: scoreboard.score + 1,
    });
  }

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
  return (
    <main>
      <Header {...scoreboard}></Header>
      <CardContainer
        pokemonList={pokemonUrlList}
        updateScore={updateScore}
      ></CardContainer>
    </main>
  );
}

export default App;
