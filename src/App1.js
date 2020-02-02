import React, { PureComponent } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";

import MovieList from "./components/MovieList/MovieList";
import SideBar from "./components/SideBar/SideBar";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import LandingPage from "./components/LandingPage/LandingPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import API from "./API";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Collection from "./components/Collection/Collection";
import RandomMovies from "./components/RandomMovies/RandomMovies";
import ActorMovies from "./components/ActorMovies/ActorMovies";

class App1 extends PureComponent {
  state = {
    myMovieIds: [],
    myMovies: [],
    searchTerm: "",
    searchPage: 1,
    adult: false,
    searchResults: []
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
      this.setState({ searchResults: movies }, () =>
        this.props.history.push(`/search/${searchTerm}/${searchPage}`)
      )
    );
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
            <PrivateRoute
              path="/movies/random"
              exact
              component={RandomMovies}
            />
            <Route
              path="/search/:search/:page"
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
              path="/actor/:id"
              render={routeProps => <ActorMovies {...routeProps} />}
            />
            <Route
              path="/movie/:id"
              render={routeProps => (
                <MovieInfo {...routeProps} />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App1);
