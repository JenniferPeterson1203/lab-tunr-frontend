import { useState, useEffect } from "react";

const API = import.meta.env.VITE_BASE_URL;

const Songs = () => {
  // create a state to store the lists of songs
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(`${API}/songs`)
      .then((res) => {
        return res.json();
      })
      .then((responseJSON) => {
        console.log(responseJSON);
      })
      .catch((error) => console.error(error));
  }, []);

  return <div>Songs</div>;
};

export default Songs;
