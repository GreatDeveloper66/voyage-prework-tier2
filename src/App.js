import React, { Component } from 'react';
import './App.css';

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
          console.log(this.state.data.items[0].family);
        });
  }
  render(){
    return (
      <div className = "App">
        <div className = "mainRow">
          <div className = "iconTitle">
            Google Fonts
            </div>
          <div className = "topMenu">
        <div className = "menuItem">
          catalog
        </div>
        <div className = "menuItem">
          features
        </div>
        <div className = "menuItem">
        articles
        </div>
        <div className = "menuItem">
        about
        </div>
      </div>
    </div>
    <div className="cards" id="cards">
     {this.state.name}
    </div>
    <Card text={"Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipusm."}/>
    </div>
    );
  }
}
class Card extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div className="card">
        {this.props.text}
      </div>
    );
  }

}



export default App;
