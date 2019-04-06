import React, { Component } from 'react';
import Movie from './Movie'

const movies =[
    {
        title : "슬기",
        poster : "https://file.mk.co.kr/meet/neds/2018/08/image_readtop_2018_518954_15346373783427494.jpg"
    }, {
        title : "아이린",
        poster : "http://img.etoday.co.kr/pto_db/2017/09/20170923024148_1130018_600_818.jpg"
    },{
        title : "예리",
        poster : "http://tenasia.hankyung.com/webwp_kr/wp-content/uploads/2016/04/2016041911063714567-540x810.jpg"
    },{
        title : "조이",
        poster : "https://img.huffingtonpost.com/asset/5ac0443f1e00003b137b0438.jpeg?cache=j2lK2hCwZ3&ops=scalefit_630_noupscale"
    }
];

class App extends Component {
    state ={
        great : "hello"
    };
  
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                great : "gdgd"
            })
  
        }, 2000);
    }
  
  
  render() {
    return (
      <div className="App">
          {this.state.great}
          {movies.map( (movie,index) => {
            return <Movie title={movie.title} poster={movie.poster} key={index}/>
          })}
      </div>
    );
  }
  }

export default App;