import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { withRouter } from 'react-router-dom';

import './MovieInfo.css'

import API from '../../API';
import ActorCard from '../ActorCard/ActorCard';


function MovieInfo({ match }) {
    useEffect(() => {
        fetchMovie();
        fetchCast();
        fetchTrailer();
    },[])

    window.scrollTo(0, 0)
    const [movie, setMovie] = useState({})
    const [cast, setCast] = useState([])
    const [trailer, setTrailer] = useState({})
    const [genres, setGenres] = useState([])

    const fetchMovie = async () => {
        const movie = await API.getOneMovie(match.params.id)
        console.log(movie.genres);
        setGenres(movie.genres)
        setMovie(movie)
    }


    const fetchCast = async () => {
        const cast = await API.getMovieCredits(match.params.id)
        setCast(cast)
    }

    const fetchTrailer = async () => {
        const trailers = await API.getMovieTrailers(match.params.id)
        const trailer = await trailers.find(trail => trail.type === 'Trailer')
        setTrailer(trailer)
    }

    const { poster_path, original_title, overview, homepage, imdb_id } = movie

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0
        }
    }

    return (
        <div className="show-movie">
            <div className="show-movie-details">
                <img className='info-card-image' src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt='' />
                <div className="movie-details">
                    <div className="movie-title">{original_title}</div>
                    <p> {overview}</p>
                    <ul>
                        GENRES: {genres.map(genre => <li key={genre.id}> {genre.name}</li>)}
                    </ul>
                    <a href={homepage} target="_blank" rel="noopener noreferrer">MOVIE HOMEPAGE</a>
                    <br />
                    <a href={`https://www.imdb.com/title/${imdb_id}`} target="_blank" rel="noopener noreferrer">www.IMDB.com</a>
                    <div>
                        {/* <button className="back-button" onClick={() => this.props.history.goBack()}>BACK</button> */}
                        {/* {myMovieIds.includes(id) ?
                <button className="remove-button" onClick={() => removeMovieFromCollection(id)}>REMOVE FROM COLLECTION</button>
                :
                <button className="add-button" onClick={() => addMovieToCollection(id)}>ADD TO COLLECTION</button>
            } */}
                    </div>
                    <YouTube
                        videoId={trailer ? trailer.key : '3cYBfuphkuE'}
                        opts={opts}
                    />
                </div>
            </div>
            <h2>MOVIE CAST:</h2>
            <ul className="movie-cast">
                {cast.map(actor => <ActorCard key={actor.cast_id} actor={actor} />)}
            </ul>
        </div>
    )



}

export default withRouter(MovieInfo)