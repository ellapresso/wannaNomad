import React, { Component  } from 'react';
import PropTypes from 'prop-types'
//import './movie.css';


class Movie extends Component {

    static propTypes  ={
        title : PropTypes.string.isRequired
    }

    render(){
        // console.log(this.props);
        return (
            <div>
                <MoviePoster poster={this.props.poster}/>
                <h1> {this.props.title}</h1>
            </div>
            );
    }
};

class MoviePoster extends Component {

    static propTypes  ={
        poster : PropTypes.string.isRequired
    };

    render(){
        return(
            <img src= { this.props.poster }  alt ="이미지"/>
        )
    }
};

export default Movie;