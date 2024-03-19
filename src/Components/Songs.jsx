import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Songs = ({ API }) => {
  const navigate = useNavigate();
  // create a state to store the lists of songs
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    fetch(`${API}/songs`)
      .then((res) => res.json())
      .then((responseJSON) => {
        setSongs(responseJSON);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <table className="table table-hover">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Song ID #</th>
          <th scope="col">Song Name</th>
          <th scope="col">Artist</th>
          <th scope="col">Run Time</th>
          <th scope="col">Favorite</th>
        </tr>
      </thead>
      <tbody>
        {songs.map(({ name, id, artist, is_favorite, time }) => (
          <tr onClick={() => navigate(`/songs/${id}`)} key={id}>
            <th scope="row">{id}</th>

            <td className="songName">{capitalizeFirstLetter(name)}</td>

            <td className="artistName">{capitalizeFirstLetter(artist)}</td>
            <td className="time">{time}</td>
            <td className="is_favorite">
              {is_favorite ? <span>👍🏿</span> : <span>👎🏿</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Songs;
