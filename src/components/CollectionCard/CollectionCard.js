import React, { Component } from 'react'
import './CollectionCard.css'


class CollectionCard extends Component {


    render() {

        const {movie} = this.props
        const {movie_poster_path, movie_title} = movie
        // console.log(movie);
        
        return (
            <div className = "movie-card" 
            // onClick={(event)=>selectMovie(movie)}
            >
            <div className='card'>
                <div className='poster'>
                    <img className="card-image" src= {movie_poster_path ? `https://image.tmdb.org/t/p/w500${movie_poster_path}` : 'https://d994l96tlvogv.cloudfront.net/uploads/film/poster/poster-image-coming-soon-placeholder-all-logos-500-x-740_17928.png'} alt='poster' />
                </div>
                <div className='col-details'>
                    <h2>{movie_title}</h2>
                </div>
            </div>
            </div>
        )
    }
}

export default CollectionCard