import React, { Component } from 'react';
import './Favorites.css';
import { connect } from "react-redux";
import { remFromList } from '../redux/actions';

const mapStateToProps = (state) => {
    return {
        favoriteMovies: state.movieList
    }
  };
const mapDispatchToProps = dispatch => ({
    remFromList: (movieList) => dispatch(remFromList(movieList))
});
class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [
            { imdbID: 'tt0068646', title: 'The Godfather', year: 1972 }
        ]
    }
    render() { 
        return (
            <div className="favorites">
                <input defaultValue="Новый список" className="favorites__name" />
                <ul className="favorites__list">
                    {this.props.favoriteMovies.map((item) => {
                        return <li key={item.imdbID}>{item.title} ({item.year})
                        <button onClick={() => this.props.remFromList(item)}>x</button></li>;
                    })}
                </ul>
                <button type="button" className="favorites__save">Сохранить список</button>
            </div>
        );
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);