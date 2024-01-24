import "./styles/App.css";
import "./styles/tile-colors.css";
import Game from "./components/GameBoard";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Game />
    </div>
  );
}

export default App;
