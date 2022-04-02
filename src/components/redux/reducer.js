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
            break;
        case 'ADD_LIST':
            if (state.movieList.find(item => item.imdbID === action.payload.movieList.imdbID)) {return state}
            return {...state, movieList: [...state.movieList, action.payload.movieList]};
            break; 
        default:
            return state;
    }
    
    
}

export default reducer;