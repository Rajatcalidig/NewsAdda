import { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';


export default class App extends Component{

  render(){
    return(
      <div>
        <NavBar/>
        <News pageSize={5} country= "in" category="science"/>
      </div>
    )
  }
}
