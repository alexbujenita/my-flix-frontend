import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Collection.css";
import { FETCH_USER_MOVIES } from '../../actions/userMovies';


import CollectionCard from "../CollectionCard/CollectionCard";
import { mapping } from "../../mappings";

class Collection extends PureComponent {

  componentDidMount() {
    const token = localStorage.getItem("token");
    const { userMovies } = this.props;
    if(!userMovies.length) {
      this.props.dispatch({
        type: FETCH_USER_MOVIES,
        token
      })
    }
    window.scrollTo(0, 0);
  }

  render() {
    const { userMovies } = this.props;
    return (
      <div className="col-container">
        {userMovies &&
          userMovies.length &&
          userMovies.map(movie => (
            <Link key={movie.id} to={`/movie/${movie.movie_ref_id}`}>
              <CollectionCard movie={movie} genres={mapping.genres} />
            </Link>
          ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userMovies: state.userMovies
  };
}

export default connect(mapStateToProps)(Collection);
