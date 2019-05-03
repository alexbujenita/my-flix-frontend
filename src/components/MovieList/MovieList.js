import React, { Component } from 'react'

import MovieCard from '../MovieCard/MovieCard'

class MovieList extends Component {

  render() {
    return (
      <div>
        {this.props.movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    )
  }
}


export default MovieList