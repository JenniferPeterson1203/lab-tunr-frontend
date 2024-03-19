import { Link } from "react-router-dom";
import React from "react";
import "../Components/Home.css";

const Home = () => {
  return (
    <div>
      <h1></h1>Welcome to the best Playlist Out there!!
      <div>
        <Link to="/songs">
          <button className="btn-55">Click me If you're ready to Jam!!</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
