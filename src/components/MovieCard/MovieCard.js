import React, { PureComponent } from "react";
import "./MovieCard.css";
import LazyLoad from "react-lazyload";

class MovieCard extends PureComponent {
  render() {
    const { movie, genres } = this.props;
    const { poster_path, title, release_date, genre_ids, overview } = movie;
    return (
      <LazyLoad height={400} width={250} once offset={1000}>
        <div className="movie-card">
          <div className="card">
            <div className="poster">
              <img
                className="card-image"
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : "http://wearetheranch.com/wp-content/uploads/2016/01/poster-placeholder.jpg"
                }
                alt="poster"
              />
            </div>
            <div className="details">
              <h2>{title}</h2>
              <div className="release-date">Release date: {release_date}</div>
              <div className="tags">
                {genre_ids.map(genre_id => (
                  <span key={genre_id} className="genre">
                    {genres.find(genre => genre.id === genre_id).name}
                  </span>
                ))}
              </div>
              <div className="info">
                <p>{overview}</p>
              </div>
            </div>
          </div>
        </div>
      </LazyLoad>
    );
  }
}

export default MovieCard;
