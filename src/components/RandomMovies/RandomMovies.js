import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';
import API from "../../API";
import MovieCard from "../MovieCard/MovieCard";
import { mapping } from '../../mappings'

class RandomMovies extends PureComponent {
  state = {
    movies: []
  };

  async componentDidMount() {
    const movies = await API.getRandomMovies();
    this.setState({ movies });
  }


  renderMovies(movies) {
    return movies.map(movie => {
      return (<Link to={`/movie/${movie.id}`} key={movie.id}>
        <MovieCard movie={movie} genres={mapping.genres} />
      </Link>)
    })
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="movies-container">
        {movies && movies.length ? (
          this.renderMovies(movies)
        ) : (
          <h1 style={{ color: "white" }}>Randomly getting movies...</h1>
        )}
      </div>
    );
  }
}

export default RandomMovies;
