import { ALL_MOVIES_REDUCER } from '../actions/allMovies';

export const allMovies = (state = [], action) => {
  console.log(action)
  if(action.type === ALL_MOVIES_REDUCER) {
    console.log(state)
    return ([...state, ...action.allMovies])
  }
  return state;
}