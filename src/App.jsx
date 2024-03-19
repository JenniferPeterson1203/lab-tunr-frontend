// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Songs from "./Components/Songs";
import Song from "./Components/Song";
import Home from "./Components/Home";
import NewSong from "./Components/NewSong";
import EditSong from "./Components/EditSong";
import FourOFour from "./Pages/FourOFour";

const App = () => {
  const API = import.meta.env.VITE_BASE_URL;

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songs" element={<Songs API={API} />} />
          <Route path="/songs/new" element={<NewSong API={API} />} />
          <Route path="/songs/:id" element={<Song API={API} />} />
          <Route path="/songs/:id/edit" element={<EditSong API={API} />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
