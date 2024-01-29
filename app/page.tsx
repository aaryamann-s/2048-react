import HomePageActionButton from "../src/components/HomePageActionButton";

export default async function Page() {
  console.log("SERVER!");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        width: "70%",
      }}
    >
      <div
        style={{
          width: "60%",
          color: "white",
        }}
      >

      {/* <DisplayLarge style={{ marginBottom: 32 }}>Play 2048!</DisplayLarge> */}

      <h1 style={{ color: 'white', marginBottom: 32 }}>Play 2048!</h1>
        <HomePageActionButton />
      </div>
      <div
        style={{
          display: "flex",
          backgroundColor: "red",
          width: "40%",
        }}
      >
        <img
          style={{
            maxWidth: "100%",
          }}
          src="https://i.imgur.com/m5rjiq4.png"
        />
      </div>
    </div>
  );
}
