import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Components/Song.css";
import Swal from "sweetalert2";

const Song = ({ API }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [song, setSong] = useState({
    id: null,
    name: "",
    artist: "",
    album: "",
    time: "",
    is_favorite: false,
  });

  // function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    fetch(`${API}/songs/${id}`)
      .then((res) => res.json())
      .then((responseJSON) => {
        // Capitalize the first letter of each string
        const formattedSong = {
          ...responseJSON,
          name: capitalizeFirstLetter(responseJSON.name),
          artist: capitalizeFirstLetter(responseJSON.artist),
          album: capitalizeFirstLetter(responseJSON.album),
        };
        setSong(formattedSong);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const deleteSong = () => {
    Swal.fire({
      title: `Are you sure you want to delete ${song.name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API}/songs/${id}`, {
          method: "DELETE",
        })
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: `${song.name} deleted successfully!`,
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              navigate(`/songs`);
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete song.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  return (
    <div>
      <div className="card w-75">
        <div className="card-body">
          <div className="card-title">
            {song.is_favorite ? (
              <h3>
                <span>⭐️ </span>
                {song.name}-{song.artist}
              </h3>
            ) : (
              <h3>
                {song.name}-{song.artist}
              </h3>
            )}
          </div>
          <p style={{ color: "purple" }}>{song.album}</p>
          <p className="card-text">Time: {song.time}</p>
        </div>
      </div>
      <div className="btn">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="btn btn-danger back-btn"
          data-bs-toggle="button"
          autoComplete="off"
        >
          Back
        </button>
        <Link to={`/songs/${id}/edit`}>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="button"
            autoComplete="off"
          >
            Edit
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="button"
          autoComplete="off"
          onClick={deleteSong}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Song;
