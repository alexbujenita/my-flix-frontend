// import React, { useState, useEffect } from 'react';
// import YouTube from 'react-youtube';
// import { withRouter } from 'react-router-dom';

// import './MovieInfo.css'

// import API from '../../API';
// import ActorCard from '../ActorCard/ActorCard';


// function MovieInfo({ match, userMovies, history }) {

//     // user movies hook
//     const setUserMovies = async () => {
//         const userMovies = await API.getUserMovies(localStorage.getItem('token'));
//         setUserMoviesTest(userMovies)
//         return userMovies.includes(movie.id)
//     }

//     useEffect(() => {
//         fetchMovie();
//         fetchCast();
//         fetchTrailer();
//         setUserMovies();
//     },[])

//     window.scrollTo(0, 0)
//     const [movie, setMovie] = useState({})
//     const [cast, setCast] = useState([])
//     const [trailer, setTrailer] = useState({})
//     const [genres, setGenres] = useState([])
//     const [belongs, setBelongs] = useState(false)
//     const [userMoviesTest, setUserMoviesTest] = useState([])

//     const fetchMovie = async () => {
//         const movie = await API.getOneMovie(match.params.id)
//         setGenres(movie.genres)
//         setMovie(movie)
//         belongsToUser();
//         console.log("IN fetchMovie: " + userMoviesTest);
//     }


//     const fetchCast = async () => {
//         const cast = await API.getMovieCredits(match.params.id)
//         setCast(cast)
//     }

//     const fetchTrailer = async () => {
//         const trailers = await API.getMovieTrailers(match.params.id)
//         const trailer = await trailers.find(trail => trail.type === 'Trailer')
//         setTrailer(trailer)
//     }

//     const { poster_path, original_title, overview, homepage, imdb_id } = movie

//     const opts = {
//         height: '390',
//         width: '640',
//         playerVars: {
//             autoplay: 0
//         }
//     }

//     const addMovieToCollection = () => {
//         const token = localStorage.getItem('token')
//         API.addMovieToCollection(movie, token)
//             .then(history.push("/"))
//     }

//     // remove movie from collection
//     const removeFavorite = (movie) => {
//         console.log(movie);
        
//         API.removeMovieFromCollection(movie, localStorage.getItem('token'))
//             .then(history.push("/"))
//     }

  
//     // check user movie
//     const belongsToUser = () => {
        
//         const userMoviesIds = userMovies.map(m => m.movie_ref_id)
//         // return userMoviesIds.includes(movie.id)  
//         const isIncluded = userMoviesIds.includes(movie.id)
//         setBelongs(isIncluded)
//         console.log(belongs)    
//     }
//     //

//     return (
//         <div className="show-movie">
//             <div className="show-movie-details">
//                 <img className='info-card-image' src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt='' />
//                 <div className="movie-details">
//                     <div className="movie-title">{original_title}</div>
//                     <p onClick={() => belongsToUser(movie)}> {overview}</p>
//                     <ul>
//                         GENRES: {genres.map(genre => <li key={genre.id}> {genre.name}</li>)}
//                     </ul>
//                     <a href={homepage} target="_blank" rel="noopener noreferrer">MOVIE HOMEPAGE</a>
//                     <br />
//                     <a href={`https://www.imdb.com/title/${imdb_id}`} target="_blank" rel="noopener noreferrer">www.IMDB.com</a>
//                     <div>
                        
//                     { belongs ? 
//                     <button className="remove-button" onAbort={console.log(belongs)} onClick={() => removeFavorite(movie)} >REMOVE FROM COLLECTION</button>
//                     :
//                     <button className="add-button" onClick={addMovieToCollection} >ADD TO COLLECTION</button>}
            
//                     </div>
//                     <YouTube
//                         videoId={trailer ? trailer.key : '3cYBfuphkuE'}
//                         opts={opts}
//                     />
//                 </div>
//             </div>
//             <h2>MOVIE CAST:</h2>
//             <ul className="movie-cast">
//                 {cast.map(actor => <ActorCard key={actor.cast_id} actor={actor} />)}
//             </ul>
//         </div>
//     )



// }

// export default withRouter(MovieInfo)
import React, { Component } from "react";
import YouTube from "react-youtube";
import { withRouter } from "react-router-dom";

import "./MovieInfo.css";

import ActorCard from "../ActorCard/ActorCard";
import API from "../../API";

class MovieInfoState extends Component {
  state = {
    userMovies: [],
    movie: {},
    genre: [],
    cast: []
  };
  componentWillMount() {
    const { match } = this.props;
    API.getUserMovies(localStorage.getItem("token")).then(result => {
      this.setState({ userMovies: result });
    });
    API.getOneMovie(match.params.id).then(movie => {
      this.setState({
        movie: movie,
        genre: movie.genre
      });
    });
    API.getMovieCredits(match.params.id).then(cast => {
      this.setState({ cast: cast });
    });
    API.getMovieTrailers(match.params.id).then(async trailers => {
      const trailer = await trailers.find(trail => trail.type === "Trailer");
      this.setState({ trailer: trailer });
    });
    window.scrollTo(0, 0);
  }

  addMovieToCollection = () => {
    const { movie } = this.state;
    const { history } = this.props;
    const token = localStorage.getItem("token");
    API.addMovieToCollection(movie, token).then(() => {
        API.getUserMovies(localStorage.getItem("token")).then(result => {
            this.setState({ userMovies: result });
          });
    });
  };

  removeMovieFromCollection = () => {
    const { movie } = this.state;
    const { history } = this.props;
    const token = localStorage.getItem("token");

    API.removeMovieFromCollection(movie, token).then(() =>{
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
    const { addMovieToCollection, removeMovieFromCollection, belongsToUser } = this;
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
          <img
            className="info-card-image"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt=""
          />
          <div className="movie-details">
            <div className="movie-title">{original_title && original_title.toUpperCase()}</div>
            <p> {overview}</p>
            <ul>
              GENRES:{" "}
              {genres && genres.map(genre => (
                <li key={genre.id}> {genre.name}</li>
              ))}
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
                  onClick={() => removeMovieFromCollection()}
                >
                  REMOVE FROM COLLECTION
                </button>
              ) : (
                <button
                  className="add-button"
                  onClick={() => addMovieToCollection()}
                >
                  ADD TO COLLECTION
                </button>
              )}
            </div>
            <YouTube
              videoId={trailer ? trailer.key : "3cYBfuphkuE"}
              opts={opts}
            />
          </div>
        </div>
        <h2>MOVIE CAST:</h2>
        <ul className="movie-cast">
          {cast && cast.map(actor => (
            <ActorCard key={actor.cast_id} actor={actor} />
          ))}
        </ul>
      </div>
    ): null;
  }
}

export default withRouter(MovieInfoState);
