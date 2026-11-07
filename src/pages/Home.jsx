
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <p className="subtitle">YOUR PERSONAL MOVIE WATCHLIST</p>
      <h1>Your next movie starts here.</h1>
      <p>
        Keep track of movies you want to watch and the ones you have
        already enjoyed.
      </p>
      <Link className="button" to="/watchlist">Open My Watchlist</Link>
    </section>
  );
}

export default Home;