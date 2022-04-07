const initialState = {
    search: '',
    movies: [],
    movieList: [],
    movieListId: null
}

function reducer(state = initialState, action) {

    switch(action.type) {
        case 'ADD_MOVIE_TO_LIST':
            return {...state, movies: action.payload.movies};
        case 'ADD_LIST':
            if (state.movieList.find(item => item.imdbID === action.payload.movieList.imdbID)) {return state}
            return {...state, movieList: [...state.movieList, action.payload.movieList]};
        case 'REMOVE_FROM_LIST':
            const movieRem = [...state.movieList];
            let movieRemIndex = movieRem.map(item => item.imdbID).indexOf(action.payload.imdbID);
            movieRemIndex >= 0 && movieRem.splice(movieRemIndex, 1);
            return {...state, movieList: movieRem}
        case 'CREATE_POST_LIST':
            return {...state, movieListId: action.payload};
            
        default:
            return state;
    }
    
    
}

export default reducer;