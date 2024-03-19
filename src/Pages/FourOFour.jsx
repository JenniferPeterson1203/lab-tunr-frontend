import { Link } from "react-router-dom";

export default function FourOFour() {
  return (
    <div>
      <h1>404</h1>
      <h1>Oops! You seem to be lost.</h1>

      <Link to="/songs">Home</Link>
    </div>
  );
}
