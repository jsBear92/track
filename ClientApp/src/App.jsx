import { useState, useEffect } from "react";

function App() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5241/api/Category");
      const data = await response.json();
      if (Array.isArray(data)) { // Check if the response is an array
        setTracks(data)
      } else {
        console.error("Expected an array but received:", data);
        setTracks([]); // Reset or set to an empty array if the data is not as expected
      }
    };

    fetchData().catch((error) => {
      console.error("Error:", error);
    });
  }, []);

  return (
    <>
      <h1>hi</h1>
      <ul>
        {tracks.map((track) => <li key={track.id}>{track.name} | {track.displayOrder}</li>)}
      </ul>
    </>
  );
}
export default App;
