import React from "react";
import "./CollectionCard.css";

const CollectionCard = ({ movie }) => {
  const { movie_poster_path, movie_title } = movie;

  return (
    <div className="movie-card">
      <div className="card">
        <div className="poster">
          <img
            className="card-image"
            src={
              movie_poster_path
                ? `https://image.tmdb.org/t/p/w500${movie_poster_path}`
                : "http://wearetheranch.com/wp-content/uploads/2016/01/poster-placeholder.jpg"
            }
            alt="poster"
          />
        </div>
        <div className="col-details">
          <h2>{movie_title}</h2>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CollectionCard);
