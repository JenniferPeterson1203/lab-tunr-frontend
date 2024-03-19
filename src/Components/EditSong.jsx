import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditSong = ({ API }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [song, setSong] = useState({
    name: "",
    artist: "",
    album: "",
    time: "",
    is_favorite: false,
  });

  const handleTextChange = (event) => {
    setSong({ ...song, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setSong({ ...song, is_favorite: !song.is_favorite });
  };

  // Update a song and redirect to show view
  const updateSong = () => {
    fetch(`${API}/songs/${id}`, {
      method: "PUT",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => navigate(`/songs/${id}`))
      .catch((error) => console.error("catch", error));
  };

  // On page load, fill in the form with the song data.
  useEffect(() => {
    fetch(`${API}/songs/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSong(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSong();
  };
  const { name, artist, album, time, is_favorite } = song;
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
            value={name}
          />
        </div>
        <div className="form-group new-form">
          <label htmlFor="name">Artist Name</label>
          <input
            type="text"
            className="form-control"
            id="artist"
            placeholder="enter artist name"
            onChange={handleTextChange}
            value={artist}
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
            value={album}
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
            value={time}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="is_favorite"
            onChange={handleCheckboxChange}
            checked={is_favorite}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Favorite
          </label>
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
      <Link to={`/songs/${id}`}>
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default EditSong;
