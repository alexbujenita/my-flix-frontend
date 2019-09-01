import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Collection.css";

import API from "../../API";
import CollectionCard from "../CollectionCard/CollectionCard";
import { mapping } from "../../mappings";

class Collection extends Component {
  state = {
    movies: [],
    page: 1,
    genres: mapping.genres
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    API.getUserMovies(localStorage.getItem("token")).then(movies =>
      this.setState({ movies })
    );
  }

  render() {
    const { movies, genres } = this.state;
    const { selectMovie } = this;

    return (
      <div className="col-container">
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.movie_ref_id}`}>
            <CollectionCard
              movie={movie}
              selectMovie={selectMovie}
              genres={genres}
            />
          </Link>
        ))}
      </div>
    );
  }
}

export default Collection;
