import React, { PureComponent } from "react";
import YouTube from "react-youtube";
import { withRouter } from "react-router-dom";

import "./MovieInfo.css";

import ActorCard from "../ActorCard/ActorCard";
import API from "../../API";

class MovieInfo extends PureComponent {
  state = {
    userMovies: [],
    movie: {},
    genre: [],
    cast: [],
    trailer: ''
  };
  componentDidMount() {
    const { match } = this.props;
    API.getUserMovies(localStorage.getItem("token")).then(result => {
      this.setState({ userMovies: result });
    });
    API.getOneMovie(match.params.id).then(movie => {
      this.setState({
        movie,
        genre: movie.genre
      });
    });
    API.getMovieCredits(match.params.id).then(cast => {
      this.setState({ cast });
    });
    API.getMovieTrailers(match.params.id).then(trailers => {
      const trailer = trailers.find(trail => trail.type === "Trailer");
      this.setState({ trailer });
    });
    window.scrollTo(0, 0);
  }

  addMovieToCollection = () => {
    const { movie } = this.state;
    const token = localStorage.getItem("token");
    API.addMovieToCollection(movie, token).then(() => {
      API.getUserMovies(localStorage.getItem("token")).then(result => {
        this.setState({ userMovies: result });
      });
    });
  };

  removeMovieFromCollection = () => {
    const { movie } = this.state;
    const token = localStorage.getItem("token");

    API.removeMovieFromCollection(movie, token).then(() => {
      API.getUserMovies(localStorage.getItem("token")).then(result => {
        this.setState({ userMovies: result });
      });
    });
  };
  belongsToUser = () => {
    const { userMovies, movie } = this.state;
    const userMoviesIds = userMovies.map(m => m.movie_ref_id);
    const isIncluded = userMoviesIds.includes(movie.id);
    return isIncluded;
  };

  render() {
    const { movie, cast, trailer } = this.state;
    const {
      poster_path,
      original_title,
      overview,
      homepage,
      imdb_id,
      genres
    } = movie;
    const {
      addMovieToCollection,
      removeMovieFromCollection,
      belongsToUser
    } = this;
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 0
      }
    };

    return movie ? (
      <div className="show-movie">
        <div className="show-movie-details">
          <div className="img-movie">
            <img
              className="info-card-image"
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt=""
            />
          </div>

          <div className="movie-details">
            <div className="movie-title">
              {original_title && original_title.toUpperCase()}
            </div>
            <p> {overview}</p>
            <ul>
              GENRES:{" "}
              {genres &&
                genres.map(genre => <li key={`$(genre.id)-${Math.ceil(Math.random()*9001)}`}> {genre.name}</li>)}
            </ul>
            <a href={homepage} target="_blank" rel="noopener noreferrer">
              MOVIE HOMEPAGE
            </a>
            <br />
            <a
              href={`https://www.imdb.com/title/${imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              www.IMDB.com
            </a>
            <div>
              {belongsToUser() ? (
                <button
                  className="remove-button"
                  onClick={removeMovieFromCollection}
                >
                  REMOVE FROM COLLECTION
                </button>
              ) : (
                <button
                  className="add-button"
                  onClick={addMovieToCollection}
                >
                  ADD TO COLLECTION
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
          <YouTube
            videoId={trailer ? trailer.key : "3cYBfuphkuE"}
            opts={opts}
          />
        </div>
        <h2>MOVIE CAST:</h2>
        <ul className="movie-cast">
          {cast &&
            cast.map(actor => <ActorCard key={`$(actor.cast_id)-${Math.ceil(Math.random()*9001)}`} actor={actor} />)}
        </ul>
      </div>
    ) : null;
  }
}

export default withRouter(MovieInfo);
