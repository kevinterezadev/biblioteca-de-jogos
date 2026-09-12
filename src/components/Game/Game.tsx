import './Game.css';

interface IGameProps {
  id: string;
  title: string;
  cover: string;
  onRemove: (id: string) => void;
}

function Game({ id, title, cover, onRemove }: IGameProps) {
  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <article className="game-card">
      <img src={cover} alt={`Capa do jogo: ${title}`} />
      <div className="game-info">
        <h3>{title}</h3>
        <button onClick={handleRemove}>Remover</button>
      </div>
    </article>
  );
}

export default Game;