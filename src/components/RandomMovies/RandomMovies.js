import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import { mapping } from "../../mappings";
import "./RandomMovies.css";

import { connect } from "react-redux";
import { FETCH_RANDOM_MOVIES } from "../../actions/randomMovies";

class RandomMovies extends PureComponent {
  state = {
    disabled: false
  };

  componentDidMount() {
    const { randomMovies } = this.props;
    if (!randomMovies.length) {
      this.props.dispatch({ type: FETCH_RANDOM_MOVIES });
    }
  }

  renderMovies = movies => {
    return movies.map(movie => {
      return (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <MovieCard movie={movie} genres={mapping.genres} />
        </Link>
      );
    });
  };

  moreRandomMovies = () => {
    this.setState({ disabled: true });
    this.props.dispatch({ type: FETCH_RANDOM_MOVIES });
    setTimeout(() => this.setState({ disabled: false }), 4000);
  };

  render() {
    const { disabled } = this.state;
    const { randomMovies } = this.props;
    return (
      <div className="movies-container">
        {randomMovies && randomMovies.length ? (
          this.renderMovies(randomMovies)
        ) : (
          <h1 style={{ color: "white" }}>Randomly getting movies...</h1>
        )}
        {randomMovies && randomMovies.length && (
          <button
            className="moreButton"
            disabled={disabled}
            onClick={this.moreRandomMovies}
          >
            More!
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ randomMovies }) => {
  return {
    randomMovies
  };
};

export default connect(mapStateToProps)(RandomMovies);
