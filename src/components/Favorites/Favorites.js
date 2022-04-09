import React, { Component } from 'react';
import './Favorites.css';
import { connect } from "react-redux";
import { remFromList, createPostList } from '../redux/actions';
import { Link } from 'react-router-dom';
import { SAVE_LIST_API } from '../config';

const mapStateToProps = (state) => {
    return {
        favoriteMovies: state.movieList,
        id: state.movieListId
    }
  };
const mapDispatchToProps = (dispatch) => {
    return {
        remFromList: (movieList) => dispatch(remFromList(movieList)),
        createPostList: (data) => dispatch(createPostList(data))
    }
};

class Favorites extends Component {
    state = {
        title: '',
        movies: '',
        isListCreated: false
    }

    handleChange = (e) => this.setState({title: e.target.value});

    handleSubmit = (e) => {
        e.preventDefault();

        fetch(SAVE_LIST_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                movies: this.props.favoriteMovies.map((item) => {
                    return item.imdbID
                })
            }),
            })
            .then(response => response.json())
            .then(data => {
                this.props.createPostList(data);
                this.setState({isListCreated: true});
                })
            .catch((error) => {
                console.error('Error:', error);
                });

    };

    render() {
        const { title, isListCreated } = this.state;
        return (
            <div className="favorites">
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Новый список" className="favorites__name"
                        value={this.state.title} onChange={this.handleChange} disabled={isListCreated}/>
                    <ul className="favorites__list">
                        {this.props.favoriteMovies.map((item) => {
                            return <li key={item.imdbID}>{item.title} ({item.year})
                            <button className='favorites__delete'
                            onClick={() => this.props.remFromList(item)}
                            disabled={isListCreated}>x</button></li>;
                        })}
                    </ul>
                    {isListCreated ? <Link to={`/list/${this.props.id}`}>Перейти к списку</Link> :
                    <button className="favorites__save" disabled={title === ''}>
                    Сохранить список
                    </button>}
                </form>
            </div>
        );
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);