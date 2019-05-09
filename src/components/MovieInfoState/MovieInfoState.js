import React, { Component } from 'react';
import YouTube from 'react-youtube';

import './MovieInfoState.css'

import ActorCard from '../ActorCard/ActorCard';

class MovieInfoState extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }


    render() {

        const { movie, cast, trailer, deselectMovie, addMovieToCollection, myMovieIds, removeMovieFromCollection } = this.props
        const { poster_path, original_title, overview, genres, homepage, imdb_id, id } = movie
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 0
            }
        };

        return (
            <div className="show-movie">
                <div className="show-movie-details">
                    <img className='info-card-image' src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt='' />
                    <div className="movie-details">
                        <div className="movie-title">{original_title.toUpperCase()}</div>
                        <p> {overview}</p>
                        <ul>
                            GENRES: {genres.map(genre => <li key={genre.id}> {genre.name}</li>)}
                        </ul>
                        <a href={homepage} target="_blank" rel="noopener noreferrer">MOVIE HOMEPAGE</a>
                        <br />
                        <a href={`https://www.imdb.com/title/${imdb_id}`} target="_blank" rel="noopener noreferrer">www.IMDB.com</a>
                        <div>
                            <button className="back-button" onClick={() => deselectMovie()}>BACK</button>
                            {myMovieIds.includes(id) ?
                                <button className="remove-button" onClick={() => removeMovieFromCollection(id)}>REMOVE FROM COLLECTION</button>
                                :
                                <button className="add-button" onClick={() => addMovieToCollection(id)}>ADD TO COLLECTION</button>
                            }
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

}

export default MovieInfoState
