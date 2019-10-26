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
              <a href="#">
                catalog
              </a>
            </div>
            <div className = "menuItem">
              <a href="#">
                features
              </a>
            </div>
            <div className = "menuItem">
              <a href="#">
                articles
              </a>
            </div>
            <div className = "menuItem">
              <a href="#">
                about
              </a>
            </div>
          </div>
        </div>
    <div className="cards" id="cards">
     {this.state.name}
     <p>
      hello
     </p>
    </div>
    <Card text={"Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipusm."} />
    </div>
    );
  }
}
class Card extends Component {


   render(){

    return(
      <div className="card">
        <p>
        {this.props.text}
        </p>
      </div>
    );
  }
}



export default App;
