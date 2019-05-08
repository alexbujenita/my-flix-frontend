class API {
    static init() {
        this.portIp = 3000;
        this.baseUrl = "http://localhost:" + this.portIp;
    }

    static getMovies(page) {
        return fetch(this.baseUrl + "/movies", {
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

    static searchMovie = (searchTerm, adult) => {
        return fetch(this.baseUrl + "/movies/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                search_term: searchTerm,
                adult
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

    static addMovieToCollection = (movie) => {
        return fetch(this.baseUrl + '/user_favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: 1,
                movie_ref_id: movie.id,
                movie_poster_path: movie.poster_path,
                movie_title: movie.title
            })
        }
        )
    }

}

API.init();

export default API;
