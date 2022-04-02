import React, { Component } from 'react';
import './MovieItem.css';
import { connect } from "react-redux";
import { addList } from '../redux/actions';

const mapDispatchToProps = dispatch => ({
    addList: (movieList) => dispatch(addList(movieList))
  });

class MovieItem extends Component {
    onClickHandler = () => {
        const movieObj = {
            imdbID: this.props.imdbID,
            title: this.props.Title,
            year: this.props.Year            
        }
        this.props.addList(movieObj);
    }

    render() {
        const { Title, Year, Poster, imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button"
                    onClick={this.onClickHandler}
                    >Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default connect(null, mapDispatchToProps)(MovieItem);