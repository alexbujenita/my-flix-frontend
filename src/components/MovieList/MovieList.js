import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";
import { ALL_MOVIES } from "../../actions/allMovies";
import { INCREMENT_PAGE } from '../../actions/incrementPage';
import { FETCH_USER_MOVIES } from '../../actions/userMovies';


import "./MovieList.css";

import MovieCard from "../MovieCard/MovieCard";
import { mapping } from "../../mappings";

class MovieList extends PureComponent {

  componentDidMount() {
    const token = localStorage.getItem("token");
    const { movies, pageNumber, userMovies } = this.props;
    if (!movies.length) {
      this.getMovies(pageNumber);
    }
    if(!userMovies.length) {
      this.props.dispatch({
        type: FETCH_USER_MOVIES,
        token
      })
    }
    window.scrollTo(0, 0);
  }

  getMovies = page => {
    this.props.dispatch({
      type: ALL_MOVIES,
      page
    });
  };

  getMoreMovies = () => {
    const { pageNumber } = this.props;
    const nextPage = pageNumber + 1;
    this.props.dispatch({
      type: INCREMENT_PAGE,
      pageNumber: nextPage
    })
    this.getMovies(nextPage);

  };

  render() {
    const { movies, userMovies } = this.props;
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
                userMovies={userMovies}
                selectMovie={selectMovie}
                genres={mapping.genres}
              />
            </Link>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.allMovies,
    pageNumber: state.pageNumber,
    userMovies: state.userMovies
  }
}

export default connect(mapStateToProps)(MovieList);
