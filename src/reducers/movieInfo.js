import { ADD_MOVIE_INFO } from '../actions/movieInfo';

export const movieInfo = (state = {}, action) => {
  if(action.type === ADD_MOVIE_INFO) {
    const newState = {...state};
    newState['movie-' + action.movieId] = action.movieInfo;
    return newState;
  }
  return state;
}