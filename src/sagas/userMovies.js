import { FETCH_USER_MOVIES, ADD_USER_MOVIES } from '../actions/userMovies';
import { call, put, takeLatest } from 'redux-saga/effects';
import API from '../API';

export function* watchForUserMovies() {
  yield takeLatest(FETCH_USER_MOVIES, fetchUserMovies);
}

export function* fetchUserMovies(action) {
  const userMovies = yield call(API.getUserMovies, action.token);
  yield put({
    type: ADD_USER_MOVIES,
    userMovies
  })
}