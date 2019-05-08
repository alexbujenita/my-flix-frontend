import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';

import './MovieList.css'

import MovieCard from '../MovieCard/MovieCard'

class MovieList extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {

    const { movies, genres, selectMovie, getMoreMovies } = this.props

    return (
      <div className="movies-container">
        <InfiniteScroll
          dataLength={movies.length}
          next={getMoreMovies}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {movies.map(movie => <Link to={`/movies/${movie.title}`}><MovieCard key={movie.id} movie={movie} selectMovie={selectMovie} genres={genres} /></Link>)}
        </InfiniteScroll>
      </div>
    )
  }
}


export default MovieList