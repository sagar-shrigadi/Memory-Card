import { useState, useEffect } from "react";
import "./styles/reset.css";
import "./App.css";
import Header from "./component/Header";
import CardContainer from "./component/CardContainer";

function App() {
  const [pokemonUrlList, setPokemonUrlList] = useState([]);
  const [scoreboard, setScoreboard] = useState({
    score: 0,
    highestScore: +window.localStorage.getItem("highestScore") || 0,
  });

  function updateScore() {
    setScoreboard((scoreboard) => ({
      ...scoreboard,
      score: scoreboard.score + 1,
    }));
  }

  function updateHighestScore(score) {
    const { highestScore } = scoreboard;
    if (score > highestScore) {
      setScoreboard((scoreboard) => ({
        ...scoreboard,
        highestScore: score,
      }));

      // bcoz the way react renders stuff (i.e batching) even when state updates above bcoz react hasnt re-rendered yet at time of calling the setItem,
      // using highestScore to set the value will cause it to be set to 0 (since the value of highest score at current(initial) render is 0)
      // on subsequent updates, since we are using || to set highestScore value in state, regardless of what score the user has, it will continue to use 0
      // hence set scoreboard.score as the highestScore value and get correct scores on subsequent renders
      window.localStorage.setItem("highestScore", `${score}`);
    }
  }
  function gameReset(status) {
    status ? alert("You Win!") : alert("You Lose!");
    window.location.reload();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=18&offset=${Math.random() * (151 - 1) + 1}`,
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
        updateHighestScore={updateHighestScore}
        gameReset={gameReset}
      ></CardContainer>
    </main>
  );
}

export default App;
