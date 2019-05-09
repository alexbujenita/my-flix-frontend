import React from "react";
import "./App.css";
import { Route, Switch, withRouter } from 'react-router-dom';

import MovieList from "./components/MovieList/MovieList";
import SideBar from "./components/SideBar/SideBar";
import MovieInfo from "./components/MovieInfo/MovieInfo";
import LandingPage from "./components/LandingPage/LandingPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import API from "./API";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
// import SearchBar from "./components/SearchBar/SearchBar";
// import SearchResults from "./components/SearchResults/SearchResults";

class App1 extends React.Component {
    state = {
        myMovieIds: [],
        myMovies: [],
        searchTerm: "",
        adult: false,
        searchResults: null,
    };

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
        event.preventDefault();
        API.searchMovie(this.state.searchTerm, this.state.adult).then(movies =>
            this.setState({ searchResults: movies })
        );
        // history.pushState('/search')
    };

    handleGoBack = () => {
        this.setState({
            searchTerm: "",
            adult: false,
            searchResults: null
        })
    }
    

    render() {
        return (
            <div className="main-container">
                <SideBar/>
                <SearchBar setSearchTerm={this.setSearchTerm} handleSearch={this.handleSearch}  searchTerm={this.state.searchTerm} />
                <Switch>
                    <Route path="/" exact component={LandingPage}/>
                    <PrivateRoute path="/movies" exact component={MovieList} />
                    <PrivateRoute path="/search" exact component={SearchResults} />
                    <PrivateRoute path="/collection" exact/>
                    <PrivateRoute path="/movies/:id" component={MovieInfo}/>
                </Switch>
            </div>
        )

    }

}

export default withRouter(App1);
