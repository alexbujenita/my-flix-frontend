import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import API from "../../API";
import MovieCard from "../MovieCard/MovieCard";
import { mapping } from "../../mappings";
import "./RandomMovies.css";

class RandomMovies extends PureComponent {
  state = {
    movies: [],
    disabled: false
  };

  async componentDidMount() {
    const movies = await API.getRandomMovies();
    this.setState({ movies });
  }

  renderMovies = movies => {
    return movies.map(movie => {
      return (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <MovieCard movie={movie} genres={mapping.genres} />
        </Link>
      );
    });
  };

  moreRandomMovies = async () => {
    this.setState({ disabled: true });
    const movies = await API.getRandomMovies();
    this.setState(
      { movies: [...this.state.movies, ...movies] },
      this.setState({ disabled: false })
    );
  };

  render() {
    const { movies, disabled } = this.state;
    return (
      <div className="movies-container">
        {movies && movies.length ? (
          this.renderMovies(movies)
        ) : (
          <h1 style={{ color: "white" }}>Randomly getting movies...</h1>
        )}
        {movies && movies.length && (
          <button
            className="moreButton"
            disabled={disabled}
            onClick={this.moreRandomMovies}
          >
            More!
          </button>
        )}
      </div>
    );
  }
}

export default RandomMovies;
