import { useState } from 'react'
import './App.css'
import Game from './components/Game/Game';
import Fieldset from './components/Fieldset/Fieldset';

interface IGame {
  gameId: string;
  gameTitle: string;
  gameCover: string;
}

function App() {
  const [gamesList, setGamesList] = useState<IGame[]>(() => {
    const savedGames = localStorage.getItem("games-lib")

    if (savedGames) {
      try {
        return JSON.parse(savedGames)
      } catch (error) {
        console.error("Erro ao ler localStorage:", error)
        return []
      }
    }

    return []
  })

  const [gameTitle, setGameTitle] = useState("")
  const [gameCover, setGameCover] = useState("")

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
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
    setGamesList(prev => {
      const updatedGameList = prev.filter(g => g.gameId !== id)
      localStorage.setItem("games-lib", JSON.stringify(updatedGameList))
      return updatedGameList
    })
  }

  return (
    <main id="app">
      <h1>Biblioteca de Jogos</h1>
      <div className="lib-content">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Adicione o seu jogo</legend>
            <Fieldset id="gameTitle" labelValue="Título do Jogo:" inputValue={gameTitle} inputOnChangeFunc={setGameTitle}/>
            <Fieldset id="gameCover" labelValue="Capa do Jogo:" inputValue={gameCover} inputOnChangeFunc={setGameCover}/>
            <button type="submit">Adicionar</button>
          </fieldset>
        </form>
      </div>
      <div className="lib-games">
        <h2>Lista de Jogos</h2>
        <div className="game-list">
          {gamesList.length === 0 ? (
            <p className="empty-state">Nenhum jogo cadastrado ainda.</p>
          ) : (
            gamesList.map(g => (
              <Game 
                key={g.gameId} 
                id={g.gameId} 
                title={g.gameTitle} 
                cover={g.gameCover} 
                onRemove={removeGame} 
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}

export default App