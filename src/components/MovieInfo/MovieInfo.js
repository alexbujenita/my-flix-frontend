import React, { PureComponent } from "react";
import { connect } from "react-redux";
import YouTube from "react-youtube";

import "./MovieInfo.css";

import ActorCard from "../ActorCard/ActorCard";
import API from "../../API";

import { FETCH_MOVIE_INFO } from "../../actions/movieInfo";

class MovieInfo extends PureComponent {
  state = {
    userMovies: []
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    if (!this.props.movieWithId) {
      this.props.dispatch({
        type: FETCH_MOVIE_INFO,
        movieId: id
      });
    }
    API.getUserMovies(localStorage.getItem("token")).then(result => {
      this.setState({ userMovies: result });
    });
    window.scrollTo(0, 0);
  }

  addMovieToCollection = () => {
    const { movie } = this.props.movieWithId;
    const token = localStorage.getItem("token");
    API.addMovieToCollection(movie, token).then(() => {
      API.getUserMovies(localStorage.getItem("token")).then(result => {
        this.setState({ userMovies: result });
      });
    });
  };

  removeMovieFromCollection = () => {
    const { movie } = this.props.movieWithId;
    const token = localStorage.getItem("token");

    API.removeMovieFromCollection(movie, token).then(() => {
      API.getUserMovies(localStorage.getItem("token")).then(result => {
        this.setState({ userMovies: result });
      });
    });
  };
  belongsToUser = () => {
    const { userMovies } = this.state;
    const { movie } = this.props.movieWithId
    const userMoviesIds = userMovies.map(m => m.movie_ref_id);
    const isIncluded = userMoviesIds.includes(movie.id);
    return isIncluded;
  };

  render() {
    
    
    const { movieWithId } = this.props;
    if (!movieWithId) return null;

    const { movie, cast, trailer } = movieWithId;

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
      height: "400",
      width: "640",
      playerVars: {
        autoplay: 0
      }
    };

    return  movie ? (
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
              GENRES:
              {genres &&
                genres.map(genre => <li key={`${genre.id}`}>{genre.name}</li>)}
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
                <button className="add-button" onClick={addMovieToCollection}>
                  ADD TO COLLECTION
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
          <YouTube
            videoId={trailer ? trailer[0].key : "3cYBfuphkuE"}
            opts={opts}
          />
        </div>
        <h2>MOVIE CAST:</h2>
        <ul className="movie-cast">
          {cast &&
            cast.map(actor => (
              <ActorCard key={`${actor.cast_id}`} actor={actor} />
            ))}
        </ul>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  movieWithId: state.movieInfo["movie-" + ownProps.match.params.id]
});

export default connect(mapStateToProps)(MovieInfo);
