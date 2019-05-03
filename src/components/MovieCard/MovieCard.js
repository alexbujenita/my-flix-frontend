import React, { Component } from 'react'
import './MovieCard.css'


class MovieCard extends Component {

    state = {
        hoverCard: false
    }

    mouseOnCard = () => {
        this.setState({ hoverCard: true })
    }

    mouseOfCard = () => {
        this.setState({ hoverCard: false })
    }

    render() {
        const { title, poster_path } = this.props.movie
        return (<div className='movie-card' onMouseEnter={this.mouseOnCard} onMouseLeave={this.mouseOfCard}>
            {this.state.hoverCard ?
                <img className='card-image-blur' src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt='' />
                :
                <img className='card-image' src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt='' />
            }
        </div >
        )
    }

}

export default MovieCard