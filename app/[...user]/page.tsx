import Header from "../../src/components/Header";

export default function User() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Header />
    </div>
  );
}
