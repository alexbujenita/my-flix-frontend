import { fork, all } from 'redux-saga/effects';

import { watchForAllMovies } from './allMovies';

export default function* rootSaga() {
  
  yield all([fork(watchForAllMovies)]);
}