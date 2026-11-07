function About() {
  return (
    <section>
      <h1>About MovieList</h1>

      <div className="card">
        <h2>Why we created it</h2>
        <p>
          It is easy to forget a movie recommended by a friend.
          MovieList gives you a simple place to keep those recommendations.
        </p>

        <h2>Who is it for?</h2>
        <p>
          Anyone who wants to organize movies and keep track of what
          they have watched.
        </p>

        <h2>How your list is saved</h2>
        <p>
          Your movies are saved in this browser. They remain after refreshing
          the page, but they are not shared between devices. Clearing your
          browser storage removes the saved list.
        </p>
      </div>
    </section>
  );
}

export default About;