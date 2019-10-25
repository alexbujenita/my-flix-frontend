import { FETCH_ACTOR_MOVIES, ADD_ACTOR_MOVIES } from '../actions/actorMovies';
import { call, put, takeLatest } from 'redux-saga/effects';
import API from '../API';

export function* watchForActorMovies() {
  yield takeLatest(FETCH_ACTOR_MOVIES, fetchActorMovie);
}

export function* fetchActorMovie(action) {
  const actorMovies = yield call(API.getActorMovies, action.actorId);
  yield put({
    type: ADD_ACTOR_MOVIES,
    actorMovies,
    actorId: action.actorId
  })
}