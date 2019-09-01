import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import API from "../../API";
import { mapping } from "../../mappings";
import MovieCard from "../MovieCard/MovieCard";

class ActorMovies extends PureComponent {
  state = {
    movies: []
  };

  // TRY With 1772

  async componentDidMount() {
    const actorId = this.props.match.params.id;
    const movies = await API.getActorMovies(actorId);
    this.setState({ movies });
  }

  renderMovies = movies => {
    return movies.map(movie => {
      return (
        <Link
          to={`/movie/${movie.id}`}
          key={`${movie.id}-${Math.ceil(Math.random() * 9001)}`}
        >
          <MovieCard movie={movie} genres={mapping.genres} />
        </Link>
      );
    });
  };

  render() {
    const { movies } = this.state;
    return (
      <div className="movies-container">
        {movies && movies.length ? (
          this.renderMovies(movies)
        ) : (
          <h1 style={{ color: "white" }}>Fetching movies, please wait...</h1>
        )}
      </div>
    );
  }
}

export default ActorMovies;
