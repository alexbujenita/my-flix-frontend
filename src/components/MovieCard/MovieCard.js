import React, { Component } from 'react'

class MovieCard extends Component {


  render() {
    const { title, poster_path } = this.props.movie
    return (
      <div>
        <h3>{title}</h3>
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
      </div>
    )
  }

}

export default MovieCard