import { useEffect, useState } from "react";

function loadMovies() {
  try {
    const saved = JSON.parse(localStorage.getItem("movies"));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function Watchlist() {
  const [movies, setMovies] = useState(loadMovies);
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [storageError, setStorageError] = useState("");

  const API_KEY = "2b5d834e";

  useEffect(() => {
    try {
      localStorage.setItem("movies", JSON.stringify(movies));
      setStorageError("");
    } catch {
      setStorageError("Your browser could not save the list.");
    }
  }, [movies]);

  async function findMovie(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (title.trim() === "") {
      setError("Please enter a movie title.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title.trim())}&type=movie`
      );

      if (!response.ok) {
        throw new Error("Could not connect to the movie service.");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setError(data.Error);
      } else {
        setResult(data);
      }
    } catch {
      setError("Could not load the movie. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function addMovie() {
    const alreadyAdded = movies.some(
      (movie) => movie.imdbID === result.imdbID
    );

    if (alreadyAdded) {
      setError("This movie is already in your watchlist.");
      return;
    }

    const newMovie = {
      id: result.imdbID,
      imdbID: result.imdbID,
      title: result.Title,
      year: result.Year,
      genre: result.Genre,
      poster: result.Poster,
      rating: result.imdbRating,
      watched: false,
    };

    setMovies([...movies, newMovie]);
    setResult(null);
    setTitle("");
    setError("");
  }

  function toggleWatched(id) {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, watched: !movie.watched };
      }

      return movie;
    });

    setMovies(updatedMovies);
  }

  function deleteMovie(id) {
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  const displayedMovies = movies.filter((movie) => {
    if (filter === "Watched") {
      return movie.watched;
    }

    if (filter === "Unwatched") {
      return !movie.watched;
    }

    return true;
  });

  const watchedCount = movies.filter((movie) => movie.watched).length;

  return (
    <section>
      <h1>My Watchlist</h1>

      <p>
        Total movies: {movies.length} | Watched: {watchedCount}
      </p>

      <form className="card form" onSubmit={findMovie}>
        <h2>Find a Movie</h2>

        <label htmlFor="title">Movie title</label>
        <input
          id="title"
          type="text"
          placeholder="For example: Rear Window"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Find Movie"}
        </button>

        {error && (
          <p className="error" role="alert">{error}</p>
        )}
      </form>

      {result && (
        <div className="card movie-preview">
          <h2>Is this the movie you want?</h2>

          {result.Poster && result.Poster !== "N/A" && (
            <img
              className="movie-poster"
              src={result.Poster}
              alt={`${result.Title} poster`}
            />
          )}

          <h2>{result.Title} ({result.Year})</h2>
          <p>{result.Genre}</p>

          <p>
            IMDb rating:{" "}
            {result.imdbRating === "N/A"
              ? "Not available"
              : `${result.imdbRating}/10`}
          </p>

          <button onClick={addMovie}>Add to Watchlist</button>
        </div>
      )}

      {storageError && (
        <p className="error" role="alert">{storageError}</p>
      )}

      <div className="filter">
        <label htmlFor="filter">Show movies</label>

        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Watched</option>
          <option>Unwatched</option>
        </select>
      </div>

      {displayedMovies.length === 0 && (
        <p className="empty">No movies to display.</p>
      )}

      <div className="grid">
        {displayedMovies.map((movie) => (
          <div className="card" key={movie.id}>
            {movie.poster && movie.poster !== "N/A" && (
              <img
                className="movie-poster"
                src={movie.poster}
                alt={`${movie.title} poster`}
              />
            )}

            <h2>
              {movie.title} {movie.year && `(${movie.year})`}
            </h2>

            <p>{movie.genre}</p>

            <p>
              IMDb rating:{" "}
              {movie.rating && movie.rating !== "N/A"
                ? `${movie.rating}/10`
                : "Not available"}
            </p>

            <p>{movie.watched ? "Watched" : "Not watched yet"}</p>

            <div className="actions">
              <button onClick={() => toggleWatched(movie.id)}>
                {movie.watched ? "Mark Unwatched" : "Mark Watched"}
              </button>

              <button
                className="delete"
                onClick={() => deleteMovie(movie.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Watchlist;