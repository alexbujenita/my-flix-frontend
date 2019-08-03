import React, { Component, Fragment } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";

import "./SearchResults.css";
import { mapping } from "../../mappings";

class SearchResults extends Component {
  state = {
    movies: [],
    page: 1,
    genres: mapping.genres
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { movies } = this.props;

    return (
      <Fragment>
        <div className="movies-container">
          {movies.length < 1 ? (
            <h1 style={{ color: "white" }}>
              {" "}
              Nothing Found! Please try another search term
            </h1>
          ) : (
            movies.map(movie => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} genres={this.state.genres} />
              </Link>
            ))
          )}
        </div>
      </Fragment>
    );
  }
}

export default SearchResults;
