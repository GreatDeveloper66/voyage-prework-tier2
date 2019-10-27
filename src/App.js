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
  constructor(props){
    super(props);
    this.state = {
      sampleText: `Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua.
                    Viverra nam libero justo laoreet
                    sit amet cursus sit. In metus vulputate
                    eu scelerisque felis imperdiet proin.
                    Arcu dictum varius duis at consectetur
                    lorem donec massa. Neque vitae tempus
                    quam pellentesque nec nam.`,
      fontsize: 10
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFontChange = this.handleFontChange.bind(this);
  }
  handleTextChange(event){
    event.preventDefault();
    const newText = event.target.value === "" ? `Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
                  Viverra nam libero justo laoreet
                  sit amet cursus sit. In metus vulputate
                  eu scelerisque felis imperdiet proin.
                  Arcu dictum varius duis at consectetur
                  lorem donec massa. Neque vitae tempus
                  quam pellentesque nec nam.` : event.target.value;
    this.setState({sampleText: newText});
  }
  handleFontChange(event){
    event.preventDefault();
    this.setState({fontsize: parseInt(event.target.value)});
  }
  render() {
    return (<div className="Catalog">
    <div className="underMenu">
      <input type="search" placeholder="search fonts"></input>
      <input type="text" placeholder="sample text" onChange={this.handleTextChange} ></input>
      <div className="instructions">
        Pick a font and choose a font size
      </div>
      <select name="fontsizes" onChange={this.handleFontChange}>
        <option value="10">10px</option>
        <option value="20">20px</option>
        <option value="30">30px</option>
        <option value="40">40px</option>
      </select>
      <button>Reset</button>
    </div>
      <h1>Catalog Section</h1>
      <div className="card" style={{fontSize: this.state.fontsize}}>{this.state.sampleText}</div>
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
