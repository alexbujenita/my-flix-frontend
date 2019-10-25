import { FETCH_RANDOM_MOVIES, ADD_RANDOM_MOVIES } from '../actions/randomMovies';
import { call, put, takeLatest } from 'redux-saga/effects';
import API from '../API';

export function* watchForRandomMovies() {
  yield takeLatest(FETCH_RANDOM_MOVIES, fetchRandomMovies);
}

export function* fetchRandomMovies() {
  const randomMovies = yield call(API.getRandomMovies);
  yield put({
    type: ADD_RANDOM_MOVIES,
    randomMovies
  })
}