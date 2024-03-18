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
        setSongs(responseJSON);
        console.log(responseJSON);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="songs">
      <h1>Songs:</h1>
      <section>
        {songs.map(({ name, id, artist, is_favorite, time, album }) => (
          <div key={id}>
            <h1 className="songName"> song name: {name}</h1>
            <h2 className="artistName">artist name: {artist}</h2>
            <p className="albumName">album name: {album}</p>
            <p className="time">run time: {time}</p>
            <p className="is_favorite">
              {is_favorite ? <span>⭐️</span> : null}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Songs;
