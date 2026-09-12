import { useState } from 'react'
import './App.css'
import Game from './components/Game';

interface IGame {
  gameId: string;
  gameTitle:string;
  gameCover: string;
}

function App() {
  const [gamesList, setGamesList] = useState<IGame[]>(() => {
    const savedGames = localStorage.getItem("games-lib")

    if (savedGames) {
      return JSON.parse(savedGames)
    }

    return []
  })

  const [gameTitle, setGameTitle] = useState("")
  const [gameCover, setGameCover] = useState("")

  const handleSubmit = (ev: React.SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (!gameTitle.trim() || !gameCover.trim()) return

    addNewGame(gameTitle, gameCover)
    setGameTitle("")
    setGameCover("")
  }

  function addNewGame(name: string, cover: string) {
    const newGame = {
      gameId: crypto.randomUUID(),
      gameTitle: name,
      gameCover: cover
    }

    setGamesList(prev => {
      const newList = [...prev, newGame]
      localStorage.setItem("games-lib", JSON.stringify(newList))
      return newList
    })
  }

  function removeGame(id: string) {
    setGamesList(prev => prev.filter(g => g.gameId !== id))
  }

  return (
    <main id="app">
      <h1>Biblioteca de Jogos</h1>
      <div className="lib-content">
        <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Adicione o seu jogo</legend>
          <fieldset>
            <label htmlFor="gameTitle">Título do Jogo:</label>
            <input type="text" id="gameTitle" value={gameTitle} onChange={(ev) => setGameTitle(ev.target.value)} required />
          </fieldset>
          <fieldset>
            <label htmlFor="gameCover">Capa do Jogo (URL):</label>
            <input type="text" id="gameCover" value={gameCover} onChange={(ev) => setGameCover(ev.target.value)} required />
          </fieldset>
          <button type="submit">Adicionar</button>
        </fieldset>
        </form>
      </div>
      <div className="lib-games">
      <h2>Lista de Jogos</h2>     
      <div>
        {gamesList.map(g => (
          <Game id={g.gameId} title={g.gameTitle} cover={g.gameCover} onRemove={removeGame} />
        ))}
      </div>

      </div>
    </main>
  )
}

export default App
