import { ALL_MOVIES_REDUCER } from '../actions/allMovies';

export const allMovies = (state = [], action) => {
  if(action.type === ALL_MOVIES_REDUCER) {
    return ([...state, ...action.allMovies]);
  }
  return state;
}