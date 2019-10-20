class API {
  static init() {
    this.portIp = 3000;
    this.baseUrl = "http://localhost:" + this.portIp;
  }

  // LOGIN
  static login(credentials) {
    return fetch(this.baseUrl + "/auth/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    }).then(resp => resp.json());
  }
  // LOGIN - GET CURRENT USER
  static getCurrentUser(token) {
    return fetch(this.baseUrl + "/auth/show", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    }).then(resp => resp.json());
  }

  //
  // GET USER FAVORITES
  static getUserMovies(token) {
    return fetch(this.baseUrl + "/favorites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    }).then(resp => resp.json());
  }
  //

  // GET RANDOM MOVIES
  static getRandomMovies() {
    return fetch(this.baseUrl + "/movies/random").then(resp => resp.json());
  }
  //

  // GET ALL MOVIES FOR AN ACTOR
  static getActorMovies(actorId) {
    return fetch(`http://localhost:3000/actor/${actorId}`).then(resp => resp.json());
  }
  //

  // ADD FAVORITE
  static addMovieToCollection = (movie, token) => {
    return fetch(this.baseUrl + "/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        movie_ref_id: movie.id,
        movie_poster_path: movie.poster_path,
        movie_title: movie.title
      })
    });
  };
  //

  // REMOVE FAVORITE
  static removeMovieFromCollection = (movie, token) => {
    return fetch(this.baseUrl + "/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ movie_id: movie.id })
    }).then(resp => resp.json());
  };
  //

  // CREATE USER
  static createUser = user => {
    return fetch(this.baseUrl + "/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(resp => resp.json());
  };

  //

  static getMovies(page) {
    return fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  }

  static getOneMovie = movieId => {
    return fetch(this.baseUrl + "/movies/1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie_id: movieId })
    }).then(resp => resp.json());
  };

  static searchMovie = (searchTerm, adult, searchPage) => {
    return fetch(this.baseUrl + "/movies/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        search_term: searchTerm,
        adult,
        page: searchPage
      })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  };

  static getMovieCredits = movieId => {
    return fetch(this.baseUrl + "/credits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie_id: movieId })
    })
      .then(resp => resp.json())
      .then(json => json.cast);
  };

  static getMovieTrailers = movieId => {
    return fetch(this.baseUrl + "/trailers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie_id: movieId })
    })
      .then(resp => resp.json())
      .then(json => json.results);
  };
}

API.init();

export default API;
