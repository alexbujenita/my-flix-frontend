import React, { Component } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import { Link } from 'react-router-dom'

import './SearchResults.css'

class SearchResults extends Component {

  state = {
    movies: [],
    page: 1,
    genres: [
      {
        id: 28,
        name: "Action"
      },
      {
        id: 12,
        name: "Adventure"
      },
      {
        id: 16,
        name: "Animation"
      },
      {
        id: 35,
        name: "Comedy"
      },
      {
        id: 80,
        name: "Crime"
      },
      {
        id: 99,
        name: "Documentary"
      },
      {
        id: 18,
        name: "Drama"
      },
      {
        id: 10751,
        name: "Family"
      },
      {
        id: 14,
        name: "Fantasy"
      },
      {
        id: 36,
        name: "History"
      },
      {
        id: 27,
        name: "Horror"
      },
      {
        id: 10402,
        name: "Music"
      },
      {
        id: 9648,
        name: "Mystery"
      },
      {
        id: 10749,
        name: "Romance"
      },
      {
        id: 878,
        name: "Science Fiction"
      },
      {
        id: 10770,
        name: "TV Movie"
      },
      {
        id: 53,
        name: "Thriller"
      },
      {
        id: 10752,
        name: "War"
      },
      {
        id: 37,
        name: "Western"
      }
    ]
  
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { movies } = this.props
    
    return (
        <React.Fragment>
        <div className="movies-container">
          { movies.length < 1 ? <h1 style={{color: 'white'}}> Nothing Found! Please try another search term</h1> :
            movies.map(movie => <Link to={`/movies/${movie.id}`} key={movie.id}><MovieCard  movie={movie}  genres={this.state.genres} /></Link>)
            }
        </div>
        </React.Fragment>
    )
  }
  
}

export default SearchResults