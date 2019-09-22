import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";
import { ALL_MOVIES } from "../../actions/allMovies";

import "./MovieList.css";

import MovieCard from "../MovieCard/MovieCard";
import { mapping } from '../../mappings'
import API from "../../API";

class MovieList extends Component {
  state = {
    movies: [],
    userMovies: [],
    page: 1,
    genres: mapping.genres
  };

  componentDidMount() {
    window.scrollTo(0, 0);    
    this.getMovies(1)
  }

  getMovies = page => {
    this.props.dispatch({
      type: ALL_MOVIES,
      page
    });
    
    API.getMovies(page).then(movies =>
      this.setState({ movies: [...this.state.movies, ...movies] })
    );
  };

  getMoreMovies = () => {
    this.setState({ page: this.state.page + 1 });
    this.getMovies(this.state.page);
  };

  render() {
    const { movies, genres } = this.state;
    const { getMoreMovies, selectMovie } = this;

    return (
      <div className="movies-container">
        <InfiniteScroll
          dataLength={movies.length}
          next={getMoreMovies}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {movies.map(movie => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <MovieCard
                movie={movie}
                userMovies={this.state.userMovies}
                selectMovie={selectMovie}
                genres={genres}
              />
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default connect(null, null, null)(MovieList);
