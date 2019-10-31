import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontFamilies: []
    };
  }

  componentDidMount() {
    fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCjVPlNgusY2WdI0-pw303Rt-rIf6YYAVw&sort=popularity").then(res => res.json()).then((result) => {
      this.setState({
        fontFamilies: result.items.map(elem => elem.family.replace(/ /g, "+"))
      });
    }, (error) => {
      this.setState({data: "Didn't Work"});
    })

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

  }

  render() {

    return (<div className="App">
      <Link fontFamilies={this.state.fontFamilies}/>
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
      <footer className="footer">Google Font API coded by Adam Shaffer</footer>
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
      fontSize: 15,
      filter: null,
      currentSearch: "",
      currentCustomSample: ""
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFontChange = this.handleFontChange.bind(this);
    this.handleFamilyChange = this.handleFamilyChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
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
      const newSample = event.target.value;
    this.setState({sampleText: newText, currentCustomSample: newSample});
  }
  handleFontChange(event) {
    event.preventDefault();
    this.setState({
      fontSize: parseInt(event.target.value)
    });
  }
  handleFamilyChange(event) {
    event.preventDefault();
    const str = event.target.value;
    let RegExpression = str === ""
      ? null
      : new RegExp("^" + str);
    this.setState({filter: RegExpression, currentSearch: str});
  }
  handleReset(event) {
    window.alert("hello");
    event.preventDefault();
    this.setState({filter: null, currentSearch: "", currentCustomSample: ""});
  }

  render() {
    return (<div className="Catalog">
      <div className="underMenu">
        <input type="search" placeholder="search fonts" onChange={this.handleFamilyChange} value={this.state.currentSearch}></input>
        <input type="text" placeholder="sample text" onChange={this.handleTextChange} value={this.state.currentCustomSample}></input>
        <div className="instructions">
          Pick a font and choose a font size
        </div>
        <select name="fontSizes" onChange={this.handleFontChange}>
          <option value="5">5px</option>
          <option value="10">10px</option>
          <option value="15" selected>15px</option>
          <option value="20">20px</option>
          <option value="25">25px</option>
        </select>
        <button onClick={this.handleReset}>Reset</button>
      </div>
      <h1>Catalog Section</h1>

      <div className="cardGrid">
        <CardGrid fontFamilies={fontFamiliesFiltered(this.props.fontFamilies, this.state.filter)} fontSize={this.state.fontSize} sampleText={this.state.sampleText}/>
      </div>

      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    </div>);
  }
}

const Link = (props) => {
  const fontArr = props.fontFamilies;
  const fontStr = `https://fonts.googleapis.com/css?family=${fontArr.join('|')}$display=swap`;
  return (<link href={fontStr} rel="stylesheet"/>);

};

const fontFamiliesFiltered = (fontFamilies, regExp) => {
  if (regExp) {
    return fontFamilies.filter(fam => regExp.test(fam));
  }
  return fontFamilies;
};

const CardGrid = (props) => {
  const Families = props.fontFamilies;
  const Size = props.fontSize;
  const Text = props.sampleText;
  const Cards = Families.map((fam, index) =>
  // Correct! Key should be specified inside the array.
  <Card fontSize={Size} fontFamily={fam} sampleText={Text} key={index}/>);
  return (Cards);
};

class Card extends React.Component {

  render() {
    return (<div className="card" style={{
        fontFamily: this.props.fontFamily
      }}>
      <div className="topCardRow">
        {this.props.fontFamily}
        <p>+</p>
      </div>
      <div className="cardBody" style={{fontSize: this.props.fontSize}}>
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
      <h1>Articles</h1>
      <div className="articleRow">
        <div className="articleTitle">
          <a href="https://design.google/library/hot-type-always-fresh/" target="_blank">
          Hot Type, Always Fresh
        </a>
        </div>
        <div className="articleDescription">
          Get to know how the Google Fonts API keeps your type up-to-date and increasingly
          efficient
        </div>
        <div className="type">
          Editorial
        </div>
      </div>
        <div className="articleRow">
          <div className="articleTitle">
            <a href="https://design.google/library/modernizing-arabic-typography-type-design/">
            Modernizing Arabic Type for a Digital Audience
          </a>
          </div>
          <div className="articleDescription">
            Designers are finally doing justice to the complex, contextual alphabet with
            a fresh approach to Arabic fonts and digital typography.
          </div>
          <div className="type">
            Editorial
          </div>

      </div>
      <div className="articleRow">
        <div className="articleTitle">
          <a href="https://design.google/library/new-wave-indian-type-design/" target="_blank">
          The New Wave of Indian Type
        </a>
        </div>
        <div className="articleDescription">
          Studying the open source, collaborative work of Indian typographers, as a
          model for global font design.
        </div>
        <div className="type">
          Editorial
        </div>
      </div>
      <div className="articleRow">
        <div className="articleTitle">
          <a href="https://design.google/library/choosing-web-fonts-beginners-guide/">
          Choosing Web Fonts: A Beginer's Guide
        </a>
        </div>
        <div className="articleDescription">
          Take the mystery of font selection with our step-by-step guidance
        </div>
        <div className="type">
          Guide
        </div>
      </div>
      <div className="articleRow">
        <div className="articleTitle">
          <a href="https://design.google/library/spectral-new-screen-first-typeface/">
          Spectral: A New Screen-First TypeFace
        </a>
        </div>
        <div className="articleDescription">
          Production Type introduces their latest commission for Google Fonts
        </div>
        <div className="type">
          Editorial
        </div>
      </div>
      <div className="articleRow">
        <div className="articleTitle">
          <a href="https://design.google/library/scripting-cyrillic/">
          Scripting Cyrillic
        </a>
        </div>
        <div className="articleDescription">
          Highlighting the design process behind expanded language support in Google
          Docs and Slides.
        </div>
        <div className="type">
          Case Study
        </div>
      </div>
      <div className="articleRow">
        <div className="articleTitle">
          <a href="https://design.google/library/superfamilies/">
          Superfamilies
        </a>
        </div>
        <div className="articleDescription">
          Explore typefaces crafted to combine harmoniously, with this featured collection
          on Google Fonts
        </div>
        <div className="type">
          fonts.google.com
        </div>
      </div>
      <div className="articleRow">
        <div className="articleTitle">
          <a href="https://design.google/library/atypi-2017-montréal/">
          ATypl 2017 Montreal
        </a>
        </div>
        <div className="articleDescription">
          Watch talks by leading thinkers and practicioners in type design including
          Paula Scher, Roger Black, Dan Rhatigan, and Santiago Orozco.
        </div>
        <div className="type">
          www.youtube.com
        </div>
      </div>
      <div className="articleRow">
        <div className="articleTitle">
          <a href="https://design.google/library/android-developers-guide-better-typography/">
          The Android Developer's Guide to Better Typography
        </a>
        </div>
        <div className="articleDescription">
          Learn how to build an app with distinctive typography
          using Android Studio's downloadable fonts feature
        </div>
        <div className="type">
          medium.com
        </div>
      </div>
      <div className="articleRow">
        <div className="articleTitle">
          <a href="https://design.google/library/introducing-space-mono/">
          Space Mono's Retro-Future Voice
        </a>
        </div>
        <div className="articleDescription">
          The story behind a new monospaced typeface by
          Colophon Foundry for Google Fonts
        </div>
        <div className="type">
          medium.com
        </div>
      </div>
      <div className="articleRow">
        <div className="articleTitle">
          <a href="https://design.google/library/reimagining-google-fonts/">
          Reimagining Google Fonts
        </a>
        </div>
        <div className="articleDescription">
          The new Google Fonts make it easier than ever to browse
          our collection of open source designer fonts and learn more about then
          people who make them.
        </div>
        <div className="type">
          Announcement
        </div>
      </div>
      <div className="articleRow">
        <div className="articleTitle">
          <a href="https://design.google/library/visit-google-fonts/">
          Discover Great Typography
        </a>
        </div>
        <div className="articleDescription">
          Find and test out free, open source web fonts from the Google Fonts catalog
        </div>
        <div className="type">
          fonts.google.com
        </div>
      </div>
    </div>);
  }
}

class About extends React.Component {
  render() {
    return (<div className="About">
      <h2>About</h2>
      <p>
        Google fonts is an excellent resources for web designers and developers.
        Over 96 open source fonts are made available at the
         <a href="https://fonts.google.com" target="_blank"> Google Fonts Site</a>
        These fonts are contributions from highly skilled designers from around then
        world. Google offers all the fonts in the catalog are free and open source.
      </p>
      <p>
        The app utilizes Google's API to present these fonts to you. The underlying
        code utilizes HTML, CSS, SCSS and JavaScript. In addition, the React Library
        handles rendering and presentation of UI elements. The current version of this
        app is a simple beta version. Future updates will add more capabilities such as
        font selection and more refined search abilities.
      </p>
    </div>);
  }
}

export default App;
