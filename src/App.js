import React from "react";
import "./App.css";

import LandingPage from './components/LandingPage/LandingPage';
import MovieList from "./components/MovieList/MovieList";
import SideBar from "./components/SideBar/SideBar";
import MovieInfo from "./components/MovieInfo/MovieInfo";

import API from "./API";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";

class App extends React.Component {
  state = {
    loggedIn: false,
    userId: null,
    userName: null,
    movies: [],
    myMovieIds: [],
    myMovies: [],
    page: 1,
    searchTerm: "",
    adult: false,
    selectedMovie: null,
    movieTrailer: {},
    movieCast: [],
    searchResults: null,
    genres: [
      {
        id: 28,
        name: "Action"
      },
      {
        id: 12,
        name: "Adventure"
      },
      {
        id: 16,
        name: "Animation"
      },
      {
        id: 35,
        name: "Comedy"
      },
      {
        id: 80,
        name: "Crime"
      },
      {
        id: 99,
        name: "Documentary"
      },
      {
        id: 18,
        name: "Drama"
      },
      {
        id: 10751,
        name: "Family"
      },
      {
        id: 14,
        name: "Fantasy"
      },
      {
        id: 36,
        name: "History"
      },
      {
        id: 27,
        name: "Horror"
      },
      {
        id: 10402,
        name: "Music"
      },
      {
        id: 9648,
        name: "Mystery"
      },
      {
        id: 10749,
        name: "Romance"
      },
      {
        id: 878,
        name: "Science Fiction"
      },
      {
        id: 10770,
        name: "TV Movie"
      },
      {
        id: 53,
        name: "Thriller"
      },
      {
        id: 10752,
        name: "War"
      },
      {
        id: 37,
        name: "Western"
      }
    ]
  };

  componentDidMount() {
    this.getMovies(this.state.page);
    const token = localStorage.getItem("token")
    if(token) {
      API.getCurrentUser(token)
        .then(user => {
          this.setState({
             loggedIn: true,
             userId: user.user_id,
             userName: user.name
            })
        })
    }
  }

  addMovieToCollection = movieId => {
    this.setState({ myMovieIds: [...this.state.myMovieIds, movieId] });
  };

  removeMovieFromCollection = movieId => {
    this.setState({
      myMovieIds: this.state.myMovieIds.filter(id => id !== movieId)
    });
  };

  getMovies = page => {
    API.getMovies(page).then(movies =>
      this.setState({ movies: [...this.state.movies, ...movies] })
    );
  };

  getMoreMovies = () => {
    this.setState({ page: this.state.page + 1 });
    this.getMovies(this.state.page);
  };

  selectMovie = movie => {
    API.getOneMovie(movie.id).then(selectedMovie =>
      this.setState({ selectedMovie })
    );
    API.getMovieCredits(movie.id).then(movieCast =>
      this.setState({ movieCast })
    );
    API.getMovieTrailers(movie.id).then(trailers =>
      this.setState({
        movieTrailer: trailers.find(trailer => trailer.type === "Trailer")
      })
    );
  };

  deselectMovie = () => {
    this.setState({ selectedMovie: null });
  };

  // LOGIN
  loginUser = (credentials) => {
    API.login(credentials)
      .then(authData => {
        if(authData.error) {
          console.log("Wrong username or password")
        } else {
          localStorage.setItem("token", authData.jwt);
          this.setState({ loggedIn: true, userId: authData.user_id, userName: authData.name })
        }
      })
  }
  //

  // USER FAVORITE
  userFavorites = () => {
    const token = localStorage.getItem("token")
    API.getUserMovies(token)
      .then(movies => this.setState({ movies }))

  }

  //

  // LOGOUT
  handleLogOut = () => {
    localStorage.clear('token');
    this.setState({
      loggedIn: false,
      userId: null,
      userName: null
    })
  }

  //



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
    });
  };

  //

  render() {
    const {
      movies,
      selectedMovie,
      movieCast,
      movieTrailer,
      genres,
      myMovieIds,
      searchTerm,
      adult,
      searchResults
    } = this.state;
    const {
      loginUser,
      selectMovie,
      deselectMovie,
      getMoreMovies,
      addMovieToCollection,
      removeMovieFromCollection,
      setSearchTerm,
      handleSearch,
      handleGoBack,
      setAdult
    } = this;

    return (
      <React.Fragment>
    {!this.state.loggedIn ?
      <LandingPage loginUser={loginUser} />
      :
      <div className="main-container">
        <div className="sidebar-container">
          <SideBar userFavorites={this.userFavorites} handleLogOut={this.handleLogOut} movies={movies} />
        </div>
        <div className="navbar-movie-container">
          <SearchBar
            setSearchTerm={setSearchTerm}
            inputValue={searchTerm}
            handleSearch={handleSearch}
            adult={adult}
            setAdult={setAdult}
          />
          {this.state.selectedMovie ? (
            <MovieInfo
              movie={selectedMovie}
              deselectMovie={deselectMovie}
              cast={movieCast}
              trailer={movieTrailer}
              addMovieToCollection={addMovieToCollection}
              removeMovieFromCollection={removeMovieFromCollection}
              myMovieIds={myMovieIds}
            />
          ) : this.state.searchResults ? (
            <SearchResults
              handleGoBack={handleGoBack}
              movies={searchResults}
              selectMovie={selectMovie}
              genres={genres}
            />
          ) : (
            <MovieList
              movies={movies}
              selectMovie={selectMovie}
              genres={genres}
              getMoreMovies={getMoreMovies}
            />
          )}
        </div>
        )}
      </div>
      }
      </React.Fragment>
    );
  }
}

export default App;
