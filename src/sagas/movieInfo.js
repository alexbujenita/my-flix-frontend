import { FETCH_MOVIE_INFO, ADD_MOVIE_INFO } from '../actions/movieInfo';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../API';

export function* watchForMovieInfo() {
  yield takeLatest(FETCH_MOVIE_INFO, fetchMovieInfo);
}

export function* fetchMovieInfo(action) {
  const [movie, cast, trailer] = yield all([
    call(API.getOneMovie, action.movieId),
    call(API.getMovieCredits, action.movieId),
    call(API.getMovieTrailers, action.movieId)
  ]);
  
  yield put({
    type: ADD_MOVIE_INFO,
    movieInfo: {
      movie,
      cast,
      trailer
    },
    movieId: movie.id
  })
}