import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Collection.css'

import API from '../../API';
import CollectionCard from '../CollectionCard/CollectionCard';

class Collection extends Component {

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
    API.getUserMovies(localStorage.getItem('token'))
      .then(movies => this.setState({ movies }))
  }

  getMovies = page => {
    API.getMovies(page).then(movies =>
      this.setState({ movies: [...this.state.movies, ...movies] })
    );
  };

  getMoreMovies = () => {
    this.setState({ page: this.state.page + 1 });
    this.getMovies(this.state.page);
  };

  render() {

    const { movies, genres } = this.state
    const { getMoreMovies, selectMovie } = this

    return (
      <div className="movies-container">
          {movies.map(movie => <Link key={movie.id} to={`/movies/${movie.movie_ref_id}`}><CollectionCard movie={movie} selectMovie={selectMovie} genres={genres} /></Link>)}
      </div>
    )
  }
}


export default Collection