import Tile from "./GameTile";

export default function GameRow(props: { row: number[]; rowIndex: number }) {
  return (
    <div className="game-row">
      {props.row.map((tileValue, index) => (
        <Tile value={tileValue} key={index} />
      ))}
    </div>
  );
}
