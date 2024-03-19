import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Components/Song.css";
import Swal from "sweetalert2";
// import { } from "react-router-dom";

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

  // const deleteSong = () => {
  //   fetch(`${API}/songs/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then(() => navigate(`/songs`))
  //     .catch((error) => console.error(error));
  // };

  // const deleteSong = () => {
  //   fetch(`${API}/songs/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then(() => {
  //       alert("Song deleted successfully!");
  //       navigate(`/songs`);
  //     })
  //     .catch((error) => console.error(error));
  // };

  const deleteSong = () => {
    fetch(`${API}/songs/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Song deleted successfully!",
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
  };

  useEffect(() => {
    fetch(`${API}/songs/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((responseJSON) => {
        setSong(responseJSON);
      })
      .catch((error) => console.error(error));
  }, [id]);

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
      {/* <button>Back</button>
      <button>Edit</button>
      <button>Delete</button> */}
    </div>
  );
};

export default Song;
