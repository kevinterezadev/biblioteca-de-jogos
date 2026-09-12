interface IGameProps {
    id: string;
    title: string;
    cover: string;
    onRemove: (id: string) => void;
}

function Game({id, title, cover, onRemove}: IGameProps) {
  return (
    <div key={id}>
        <img src={cover} alt={`Capa do jogo: ${title}`} />
        <h3>{title}</h3>
        <button onClick={() => onRemove(id)}>Remover</button>
        </div>
    )
}

export default Game


