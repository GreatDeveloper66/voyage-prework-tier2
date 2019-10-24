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
      data: []
    };

  }
  render(){
    return (
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
    );
  }
}



export default App;
