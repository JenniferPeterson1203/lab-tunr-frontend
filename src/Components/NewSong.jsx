import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewSongs = ({ API }) => {
  const navigate = useNavigate();

  // create state to hold the form
  const [song, setSong] = useState({
    name: "",
    artist: "",
    album: "",
    time: "",
    is_favorite: false,
  });

  // const isValidTime = (time) => {
  //   // Regular expression pattern to match the time format (e.g., hours:minutes)
  //   const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  //   return timePattern.test(time);
  // };
  const isValidTime = (time) => {
    const timePattern = /^([0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return timePattern.test(time);
  };

  // Add a song. Redirect to the index view.
  const addSong = () => {
    fetch(`${API}/songs`, {
      method: "POST",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        navigate(`/songs`);
      })
      .catch((error) => console.error("catch", error));
  };

  const handleTextChange = (event) => {
    setSong({ ...song, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setSong({ ...song, is_favorite: !song.is_favorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the time input is a valid time
    if (!isValidTime(song.time)) {
      alert("Invalid time format. Please enter a valid time (hh:mm).");
      return;
    }

    addSong();
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <div className="form-group new-form">
          <label htmlFor="name">Song Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="song-name"
            placeholder="enter song name"
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-group new-form">
          <label htmlFor="artist">Artist Name</label>
          <input
            type="text"
            className="form-control"
            id="artist"
            placeholder="enter artist name"
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-group new-form">
          <label htmlFor="album">Album Name</label>
          <input
            type="text"
            className="form-control"
            id="album"
            placeholder="enter album name"
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-group new-form">
          <label htmlFor="time">Run Time</label>
          <input
            type="text"
            className="form-control"
            id="time"
            placeholder="enter run time"
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="is_favorite"
            onChange={handleCheckboxChange}
            checked={song.is_favorite}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Favorite
          </label>
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
      {/* <button onClick={() => navigate("/songs")}>Cancel</button> */}
    </div>
  );
};

export default NewSongs;
