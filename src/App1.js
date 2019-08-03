import React, { Component } from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";

import MovieList from "./components/MovieList/MovieList";
import SideBar from "./components/SideBar/SideBar";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import LandingPage from "./components/LandingPage/LandingPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import API from "./API";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Collection from "./components/Collection/Collection";
// import SearchBar from "./components/SearchBar/SearchBar";

class App1 extends Component {
  state = {
    myMovieIds: [],
    userMovies: [],
    myMovies: [],
    searchTerm: "",
    searchPage: 1,
    adult: false,
    searchResults: null
  };

  componentDidMount() {
    API.getUserMovies(localStorage.getItem("token")).then(userMovies =>
      this.setState({ userMovies })
    );
  }

  addMovieToCollection = movieId => {
    this.setState({ myMovieIds: [...this.state.myMovieIds, movieId] });
  };

  removeMovieFromCollection = movieId => {
    this.setState({
      myMovieIds: this.state.myMovieIds.filter(id => id !== movieId)
    });
  };

  // SEARCH
  setSearchTerm = searchTerm => {
    this.setState({ searchTerm });
  };

  setAdult = () => {
    this.setState({
      adult: !this.state.adult
    });
  };

  handleSearch = event => {
    const { searchPage, adult, searchTerm } = this.state;
    event.preventDefault();
    API.searchMovie(searchTerm, adult, searchPage).then(movies =>
      this.setState(
        { searchResults: movies },
        () => this.props.history.push("/search")
      )
    );
  };

  handleGoBack = () => {
    this.setState({
      searchTerm: "",
      adult: false,
      searchResults: null
    });
  };

  render() {
    return (
      <div className="main-container">
        <SideBar />
        <div className="show-container">
          {localStorage.getItem("token") && (
            <SearchBar
              setSearchTerm={this.setSearchTerm}
              handleSearch={this.handleSearch}
              searchTerm={this.state.searchTerm}
              setAdult={this.setAdult}
            />
          )}
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <PrivateRoute path="/movies" exact component={MovieList} />
            <Route
              path="/search"
              exact
              render={routeProps => (
                <SearchResults
                  {...routeProps}
                  searchPage={this.state.searchPage}
                  movies={this.state.searchResults}
                />
              )}
            />
            <PrivateRoute
              path="/collection"
              exact
              component={Collection}
              attr={{ name: "Col" }}
            />
            <Route
              path="/movie/:id"
              render={routeProps => (
                <MovieInfo {...routeProps} userMovies={this.state.userMovies} />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App1);
