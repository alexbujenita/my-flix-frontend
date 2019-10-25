import { ADD_RANDOM_MOVIES } from '../actions/randomMovies';

export const randomMovies = (state = [], action) => {
  if (action.type === ADD_RANDOM_MOVIES) {
    return ([...state, ...action.randomMovies]);
  }
  return state;
}