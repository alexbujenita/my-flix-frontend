import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";

import "./SearchResults.css";
import { mapping } from "../../mappings";

const SearchResults = ({ movies }) => {
  return (
    <div className="movies-container">
      {movies.length < 1 ? (
        <h1 style={{ color: "white" }}>
          {" "}
          Nothing Found! Please try another search term
        </h1>
      ) : (
        movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <MovieCard movie={movie} genres={mapping.genres} />
          </Link>
        ))
      )}
    </div>
  );
};

export default SearchResults;
