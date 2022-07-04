import React, { Component } from 'react';
import './ListPage.css';
import { API_KEY } from "../../components/config";
import { Link } from 'react-router-dom';

class ListPage extends Component {
    state = {
        listTitle: '',
        imdbID: [],
        movies: []
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({ listTitle: data.title, imdbID: data.movies });
            [...this.state.imdbID].forEach((item) => {
                fetch(`http://www.omdbapi.com/?i=${item}&apikey=${API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({movies: [...this.state.movies, data]});
                })
                .catch((error) => {console.error(error)});
            });
        });
    }
    render() {
        return (
            <>
            <Link className="header__menu" to={"/"}>Back</Link>
            <div className="list-page">
                <h1 className="list-page__title">{this.state.listTitle}</h1>
                <ul>
                    {this.state.movies && this.state.movies.map((item) =>
                        <li key={item.imdbID}>
                            <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank" rel="noopener noreferrer">{item.Title} ({item.Year})</a>
                        </li>
                    )}
                </ul>
            </div>
            </>
        );
    }
}
 
export default ListPage;