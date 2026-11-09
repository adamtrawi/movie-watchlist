function Features() {
  return (
    <section>
      <h1>Features</h1>
      <p>Everything you need for a simple movie watchlist.</p>

      <div className="grid">
        <div className="card">
          <h2>Add movies</h2>
          <p>Enter a movie title and choose its genre.</p>
        </div>

        <div className="card">
          <h2>Track your progress</h2>
          <p>Mark movies as watched or move them back to your unwatched list.</p>
        </div>

        <div className="card">
          <h2>Filter your list</h2>
          <p>Display all movies, watched movies, or unwatched movies.</p>
        </div>

        <div className="card">
          <h2>Remove movies</h2>
          <p>Delete movies you no longer want to keep.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;