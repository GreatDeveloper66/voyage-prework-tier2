import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Walrus Man",
      data: [],
      fontFamilies: [
        'Roboto',
        'Open Sans',
        'Lato',
        'Stoke',
        'Poppins',
        'PT Serif',
        'Muli',
        'Lora',
        'Nunito'
      ]
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
    const items = [".Catalog", ".Featured", ".Articles", ".About"].map(elem => document.querySelector(elem));
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

    const fontList = this.state.fontFamilies.map(elem => elem).join(', ');
    console.log(fontList);

    let WebFont = require('webfontloader');

    WebFont.load({
      google: {
        families: [fontList]
      }
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
            <button id="catalog">
              catalog
            </button>
          </div>
          <div className="menuItem">
            <button id="features">
              features
            </button>
          </div>
          <div className="menuItem">
            <button id="articles">
              articles
            </button>
          </div>
          <div className="menuItem">
            <button id="about">
              about
            </button>
          </div>
        </div>
      </div>
      <Catalog fontFamilies={this.state.fontFamilies}/>
      <Featured/>
      <Articles/>
      <About/>

    </div>);
  }
}

class Catalog extends React.Component {
  constructor(props) {
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
      fontSize: 10,
      fontFamilies: [
        "Arial",
        "Helvetica",
        "Times",
        "Palatino",
        "Garammond",
        "Bookman",
        "Courier",
        "Avant Garde"
      ]
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFontChange = this.handleFontChange.bind(this);
  }
  handleTextChange(event) {
    event.preventDefault();
    const newText = event.target.value === ""
      ? `Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
                  Viverra nam libero justo laoreet
                  sit amet cursus sit. In metus vulputate
                  eu scelerisque felis imperdiet proin.
                  Arcu dictum varius duis at consectetur
                  lorem donec massa. Neque vitae tempus
                  quam pellentesque nec nam.`
      : event.target.value;
    this.setState({sampleText: newText});
  }
  handleFontChange(event) {
    event.preventDefault();
    this.setState({
      fontSize: parseInt(event.target.value)
    });
  }
  render() {
    return (<div className="Catalog">
      <div className="underMenu">
        <input type="search" placeholder="search fonts"></input>
        <input type="text" placeholder="sample text" onChange={this.handleTextChange}></input>
        <div className="instructions">
          Pick a font and choose a font size
        </div>
        <select name="fontSizes" onChange={this.handleFontChange}>
          <option value="10">10px</option>
          <option value="20">20px</option>
          <option value="30">30px</option>
          <option value="40">40px</option>
        </select>
        <button>Reset</button>
      </div>
      <h1>Catalog Section</h1>

      <div className="cardGrid">
        <CardGrid fontFamilies={this.state.fontFamilies} fontSize={this.state.fontSize} sampleText={this.state.sampleText}/>
      </div>

      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    </div>);
  }
}

const CardGrid = (props) => {
  const Families = props.fontFamilies;
  const Size = props.fontSize;
  const Text = props.sampleText;
  const Cards = Families.map((fam,index) =>
  // Correct! Key should be specified inside the array.
  <Card fontSize={Size} fontFamily={fam} sampleText={Text} key={index}/>);
  return (Cards);
};

class Card extends React.Component {

  render() {
    return (<div className="card" style={{
        fontSize: this.props.fontSize,
        fontFamily: this.props.fontFamily
      }}>
      <div className="topCardRow">
        {this.props.fontFamily}
        <p>+</p>
      </div>
      <div className="cardBody">
        {this.props.sampleText}
      </div>
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
