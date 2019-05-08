import React from "react";
import "./App.css";
import { Route, Switch, withRouter } from 'react-router-dom';

import MovieList from "./components/MovieList/MovieList";
import SideBar from "./components/SideBar/SideBar";
import MovieInfo from "./components/MovieInfo/MovieInfo";

import API from "./API";
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

    componentDidMount() {
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
        event.preventDefault();
        API.searchMovie(this.state.searchTerm, this.state.adult).then(movies =>
            this.setState({ searchResults: movies })
        );
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
                <Switch>
                    <Route path="/movies" exact component={MovieList}/>
                    <Route path="/collection" exact/>
                    <Route path="/movies/:id" component={MovieInfo}/>
                </Switch>

            </div>
        )

    }

}

export default withRouter(App1);
