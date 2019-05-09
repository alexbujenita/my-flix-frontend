import React, { Component } from 'react'
import './MovieCard.css'


class MovieCard extends Component {


    render() {

        const {movie, genres} = this.props
        const {poster_path, title, release_date, genre_ids, overview} = movie
        // console.log(movie);
        
        return (
            <div className = "movie-card" 
            // onClick={(event)=>selectMovie(movie)}
            >
            <div className='card'>
                <div className='poster'>
                    <img className="card-image" src= {poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://d994l96tlvogv.cloudfront.net/uploads/film/poster/poster-image-coming-soon-placeholder-all-logos-500-x-740_17928.png'} alt='poster' />
                </div>
                <div className='details'>
                    <h2>{title}</h2>
                    <div className='release-date'>Release date: {release_date}</div>
                    <div className="tags">
                    {genre_ids.map(genre_id => <span key={genre_id} className="genre">{genres.find(genre => genre.id === genre_id).name}</span>)}
                    </div>
                    <div className="info">
                        <p>{overview}</p>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default MovieCard