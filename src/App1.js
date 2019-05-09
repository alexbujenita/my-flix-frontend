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
import Collection from "./components/Collection/Collection"
// import SearchBar from "./components/SearchBar/SearchBar";

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
            this.setState({ searchResults: movies }, () => this.props.history.push('/search'))
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
                <div>
                { localStorage.getItem('token') && <SearchBar setSearchTerm={this.setSearchTerm} handleSearch={this.handleSearch}  searchTerm={this.state.searchTerm} />}
                <Switch>
                    <Route path="/" exact component={LandingPage}/>
                    <PrivateRoute path="/movies" exact component={MovieList} />
                    <Route path="/search" exact render={(routeProps) => (
                        <SearchResults {...routeProps} movies={this.state.searchResults} />
                    ) } />
                    <PrivateRoute path="/collection" exact component={Collection} />
                    <PrivateRoute path="/movies/:id" component={MovieInfo}/>
                </Switch>
                </div>
            </div>
        )

    }

}

export default withRouter(App1);
