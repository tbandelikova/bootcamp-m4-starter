export function addMovieToList(movies) {
    return {
      type: 'ADD_MOVIE_TO_LIST',
      payload: {
        movies: movies
      }
    }
  }

  export function addList(movieList) {
    return {
      type: 'ADD_LIST',
      payload: {
        movieList: movieList
      }
    }
  }