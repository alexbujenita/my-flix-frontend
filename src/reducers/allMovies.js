import { ALL_MOVIES_REDUCER } from '../actions/allMovies';

export const allMovies = (state = {}, action) => {
  if(action.type === ALL_MOVIES_REDUCER) {
    
    return Object.assign(state, action.allMovies)
  }
  return state;
}