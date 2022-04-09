import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import './Header.css';

const mapStateToProps = (state) => {
    return {
        id: state.movieListId
    }
  };

class Header extends Component {
    render() { 
        return (
            <header className="header">
                <h1 className="header__title">
                    MustSee
                </h1>
                <div>
                    {this.props.id && <Link className="header__menu"to={`/list/${this.props.id}`}>My List</Link>}
                </div>
            </header>
        );
    }
}
 
export default connect(mapStateToProps)(Header);