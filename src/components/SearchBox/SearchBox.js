import React, { Component } from 'react';
import './SearchBox.css';
import { connect } from "react-redux";
import { addMovieToList } from "../redux/actions";
import { API_KEY } from '../config';

const mapDispatchToProps = dispatch => ({
    addMovieToList: (movieList) => dispatch(addMovieToList(movieList))
  });

class SearchBox extends Component {
    state = {
        searchLine: '',
        movieInfo: {}
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
    }

    searchMovie = (name) => {
        fetch(`http://www.omdbapi.com/?s=${name}&apikey=${API_KEY}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (!data.Response || data.Response === 'False') {return alert('error')}
                this.props.addMovieToList(data.Search);
            });
    }

    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                        onClick={() => this.searchMovie(searchLine)}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
export default connect(null, mapDispatchToProps)(SearchBox);