export default function GameTile(props: { value: number }) {
  if (props.value)
    return <div className="game-tile" data-value={props.value} />;

  return <div className="game-tile" />;
}
