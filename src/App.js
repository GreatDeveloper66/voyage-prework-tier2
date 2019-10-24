/*global window*/
/*global document*/
/*global Modernizr*/
/*global SmoothScroll*/
/*global console*/
/*global $*/
/*jshint esversion:6*/
/*global event*/
/*global requestAnimationFrame*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
/*
function App() {
  return (
    <main/>
  );
}
*/

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "Walrus Man",
      data: []
    };
  }
  componentDidMount(){
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCjVPlNgusY2WdI0-pw303Rt-rIf6YYAVw')
      .then(response => response.json())
      .then(data => {
          this.setState({data: data});
          window.alert(this.state.data.kind);
        });
  }
  render(){
    return (
      <div class = "App">
        <div class = "mainRow">
          <div class = "iconTitle">
            Google Fonts
            </div>
          <div class = "topMenu">
        <div class = "menuItem">
          catalog
        </div>
        <div class = "menuItem">
          features
        </div>
        <div class = "menuItem">
        articles
        </div>
        <div class = "menuItem">
        about
        </div>
      </div>
    </div>
    <div class="cards" id="cards">
     {this.state.name}
     {this.state.data.kind}
    </div>
    </div>
    );
  }
}



export default App;
