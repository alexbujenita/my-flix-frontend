import React, { Component } from 'react'
import MovieCard from '../MovieCard/MovieCard'

import './SearchResults.css'

class SearchResults extends Component {


  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {

    const { movies, genres, selectMovie, handleGoBack } = this.props

    return (
        <React.Fragment>
        <input value='Go Back' onClick={handleGoBack} />
        <div className="movies-container">
          { movies.length < 1 ? <h1 style={{color: 'white'}}> Nothing Found! Please try another search term</h1> :
            movies.map(movie => <MovieCard key={movie.id} movie={movie} selectMovie={selectMovie} genres={genres} />)
            }
        </div>
        </React.Fragment>
    )
  }
  
}

export default SearchResults