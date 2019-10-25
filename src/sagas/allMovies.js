import { ALL_MOVIES, ALL_MOVIES_REDUCER } from '../actions/allMovies';
import { call, put, takeLatest } from 'redux-saga/effects';
import API from '../API';

export function* watchForAllMovies() {  
  yield takeLatest(ALL_MOVIES, fetchAllMovies);
}

export function* fetchAllMovies(action) {
  const allMovies = yield call(API.getMovies, action.page)
  yield put({
    type: ALL_MOVIES_REDUCER,
    allMovies
  });
}