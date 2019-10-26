import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Walrus Man",
      data: []
    };
  }

  componentDidMount() {
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCjVPlNgusY2WdI0-pw303Rt-rIf6YYAVw').then(response => response.json()).then(data => {
      this.setState({data: data});
    });
    const catalog = document.getElementById('catalog');
    const features = document.getElementById('features');
    const articles = document.getElementById('articles');
    const about = document.getElementById('about');
    const items = [".Catalog", ".Featured", ".Articles", ".About"]
      .map(elem => document.querySelector(elem));
    const menuitems = Array.from(document.querySelectorAll('a'));
    function reveal(i) {
      items.forEach(elem => elem.style.display = "none");
      items[i].style.display = "grid";
    }

    catalog.addEventListener("click", function() {
      reveal(0);
    });
    features.addEventListener("click", function() {
      reveal(1);
    });
    articles.addEventListener("click", function() {
      reveal(2);
    });
    about.addEventListener("click", function() {
      reveal(3);
    });

  }

  render() {

    return (<div className="App">
      <div className="mainRow">
        <div className="iconTitle">
          Google Fonts
        </div>
        <div className="topMenu">
          <div className="menuItem">
            <a href="#" id="catalog">
              catalog
            </a>
          </div>
          <div className="menuItem">
            <a href="#" id="features">
              features
            </a>
          </div>
          <div className="menuItem">
            <a href="#" id="articles">
              articles
            </a>
          </div>
          <div className="menuItem">
            <a href="#" id="about">
              about
            </a>
          </div>
        </div>
      </div>
      <Catalog/>
      <Featured/>
      <Articles/>
      <About/>

    </div>);
  }
}

class Catalog extends React.Component {
  render() {
    return (<div className="Catalog">
      <h1>Catalog Section</h1>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    </div>);
  }
}

class Featured extends React.Component {
  render() {
    return (<div className="Featured">
      <h1>Featured Section</h1>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    </div>);
  }
}

class Articles extends React.Component {
  render() {
    return (<div className="Articles">
      <h1>Articles Section</h1>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    </div>);
  }
}

class About extends React.Component {
  render() {
    return (<div className="About">
      <h1>About Section</h1>
      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    </div>);
  }
}

export default App;
