import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";
import { ALL_MOVIES } from "../../actions/allMovies";

import "./MovieList.css";

import MovieCard from "../MovieCard/MovieCard";
import { mapping } from "../../mappings";

class MovieList extends Component {
  state = {
    movies: [],
    userMovies: [],
    page: 1,
    genres: mapping.genres
  };

  componentDidMount() {
    const { movies } = this.props;
    window.scrollTo(0, 0);
    if (!movies.length) {
      this.getMovies(1);
    }
  }

  getMovies = page => {
    this.props.dispatch({
      type: ALL_MOVIES,
      page
    });
  };

  getMoreMovies = () => {
    console.log(this.state.page)
    this.setState({ page: this.state.page + 1 }, () => {
      this.getMovies(this.state.page);
    });
  };

  render() {
    const { movies } = this.props;
    const { genres } = this.state;
    const { getMoreMovies, selectMovie } = this;
    console.log(this.props)
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

function mapStateToProps(state) {
  console.log(state.allMovies)
  return {
    movies: state.allMovies
  }
}

export default connect(
  mapStateToProps,
  null,
  null
)(MovieList);
