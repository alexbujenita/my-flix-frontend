import { fork, all } from "redux-saga/effects";

import { watchForAllMovies } from "./allMovies";
import { watchForPage } from "./pageNumber";

export default function* rootSaga() {
  yield all([fork(watchForAllMovies), fork(watchForPage)]);
}
