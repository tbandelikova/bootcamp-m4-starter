import React, { Component } from 'react';
import './ListPage.css';
import { API_KEY } from "../../components/config";

class ListPage extends Component {
    state = {
        listTitle: '',
        imdbID: [],
        movies: []
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({ listTitle: data.title, imdbID: data.movies });
            const newArr = [];
            this.state.imdbID.forEach((item) => {
                fetch(`http://www.omdbapi.com/?i=${item}&apikey=${API_KEY}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    newArr.push(data);
                })
                .catch((error) => {console.error(error)});
            });
            this.setState({movies: newArr});
        });

    }
    render() { 
        console.log(this.state.movies);
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.listTitle}</h1>
                <ul>
                    {this.state.movies && this.state.movies.map((item) => 
                         
                            // <li key={item.imdbID}>
                            //     <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">{item.Title} ({item.Year})</a>
                            // </li>
                            <>{item.Title}</>
                        
                    )}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;