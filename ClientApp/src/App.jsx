import { useState, useEffect } from "react";

function App() {
  const [tracks, setTracks] = useState("");

  useEffect(() => {
    fetch("http://localhost:5241/api/track/GetTracks")
      .then((response) => response.text())
      .then((data) => {
        setTracks(data);
        console.log(data);
      });
  });

  return (
    <>
      <h1>hi</h1>
      <p>{tracks}</p>
    </>
  );
}

export default App;
