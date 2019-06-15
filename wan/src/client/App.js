import React, { Component } from 'react';
import './app.css';


class MyComponent extends Component {
    state={
      hi:"hello world!"
    }
    render() {
        return(
            <div>
              <h1>{this.state.hi}</h1>
            </div>
        );
    }
}

export default MyComponent;
