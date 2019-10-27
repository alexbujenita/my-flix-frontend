import { fork, all } from "redux-saga/effects";

import { watchForAllMovies } from "./allMovies";
import { watchForPage } from "./pageNumber";
import { watchForActorMovies } from "./actorMovies";
import { watchForRandomMovies } from "./randomMovies";
import { watchForMovieInfo } from "./movieInfo";
import { watchForUserMovies } from "./userMovies";

export default function* rootSaga() {
  yield all([
    fork(watchForAllMovies),
    fork(watchForPage),
    fork(watchForActorMovies),
    fork(watchForRandomMovies),
    fork(watchForMovieInfo),
    fork(watchForUserMovies)
  ]);
}
