import dynamic from "next/dynamic";
import "../src/styles/App.css";
import "../src/styles/tile-colors.css";

const GameBoard = dynamic(() => import("../src/components/GameBoard"), {
  ssr: false,
});

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <GameBoard />
    </div>
  );
}
