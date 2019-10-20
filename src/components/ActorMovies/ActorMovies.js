import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { mapping } from "../../mappings";
import MovieCard from "../MovieCard/MovieCard";

import { FETCH_ACTOR_MOVIES } from "../../actions/actorMovies";

class ActorMovies extends PureComponent {

  componentDidMount() {
    const actorId = this.props.match.params.id;
    if(!this.props.actorMoviesForId) {      
      this.props.dispatch({
        type: FETCH_ACTOR_MOVIES,
        actorId
      });
    }
  }

  renderMovies = movies => {
    return movies.map(movie => {
      return (
        <Link to={`/movie/${movie.id}`} key={`${movie.id}-${movie.title}`}>
          <MovieCard movie={movie} genres={mapping.genres} />
        </Link>
      );
    });
  };

  render() {
    const { actorMoviesForId } = this.props;    

    return (
      <div className="movies-container">
        {actorMoviesForId && actorMoviesForId.length ? (
          this.renderMovies(actorMoviesForId)
        ) : (
          <h1 style={{ color: "white" }}>Fetching movies, please wait...</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  actorMoviesForId: state.actorMovies[ownProps.match.params.id]
});

export default connect(mapStateToProps)(ActorMovies);
