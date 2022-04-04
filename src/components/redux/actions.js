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

  export function remFromList(movieList) {
    return {
      type: 'REMOVE_FROM_LIST',
      payload: movieList
    }
  }
  
  export function createPostList(data) {
    return {
      type: 'CREATE_POST_LIST',
      payload: data.id
    }
  }