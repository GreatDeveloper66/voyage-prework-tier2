import React, {Component} from 'react';
import './App.css';

const currentSample = () => `Lorem ipsum dolor sit amet,
            consectetur adipiscing elit,
            sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
            Viverra nam libero justo laoreet
            sit amet cursus sit. In metus vulputate
            eu scelerisque felis imperdiet proin.
            Arcu dictum varius duis at consectetur
            lorem donec massa. Neque vitae tempus
            quam pellentesque nec nam.`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleText: currentSample(),
      currentCustomSample: '',
      fontSize: 15,
      fontFamilies: [],
      numCurrentDisplay: 0,
      numFonts: 0,
      filter: null,
      currentSearch: "",
      fontsDisplayed: [],
      importFontsChosen: "",
      standardFontsChosen: "",
      importString: "",
      standardString: ""
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFontChange = this.handleFontChange.bind(this);
    this.handleFamilyChange = this.handleFamilyChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addFontsChosen = this.addFontsChosen.bind(this);
  }
  handleTextChange(event) {
    event.preventDefault();
    const newText = event.target.value === ""
      ? currentSample()
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
    event.preventDefault();
    this.setState({
      filter: null,
      currentSearch: "",
      currentCustomSample: "",
      sampleText: currentSample(),
      numCurrentDisplay: 6,
      fontSize: 15,
      importFontsChosen: "",
      standardFontsChosen: "",
      importString: "",
      standardString: ""
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const curr = this.state.numCurrentDisplay;
    const total = this.state.numFonts;
    const addNum = curr < total
      ? (
        total - curr < 6
        ? total - curr
        : 6)
      : 0;
    this.setState({
      numCurrentDisplay: curr + addNum
    });
  }

  addFontsChosen(fontFamily){
    const oldImport = this.state.importFontsChosen;
    const oldStandard = this.state.standardFontsChosen;
    const divider = oldImport === "" ? "" : "|";
    const newImport = oldImport + divider + fontFamily;
    const newStandard = oldStandard + divider + fontFamily;
    const newImportFams = `@import url('https://fonts.googleapis.com/css?family=${newImport}&display=swap')`;
    const newStandardFams = `<link href='https://fonts.googleapis.com/css?family=${newStandard}&display=swap' rel='stylesheet'>`;
    this.setState({
        importFontsChosen: newImport,
        standardFontsChosen: newStandard,
        importString: newImportFams,
        standardString: newStandardFams
    });
  }


  componentDidMount() {
    fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCjVPlNgusY2WdI0-pw303Rt-rIf6YYAVw&sort=popularity").then(res => res.json()).then((result) => {
      let fontArr = result.items.map(elem => elem.family.replace(/ /g, "+"));
      this.setState({fontFamilies: fontArr, numCurrentDisplay: 6, numFonts: fontArr.length});
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
    return (
      <div className="appContainer">
      <div className="App">
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
      <Catalog sampleText={this.state.sampleText} currentCustomSample={this.state.currentCustomSample}
        handleTextChange={this.handleTextChange} handleFontChange={this.handleFontChange}
        fontSize={this.state.fontSize} fontFamilies={this.state.fontFamilies} filter={this.state.filter}
        numCurrentDisplay={this.state.numCurrentDisplay} handleFamilyChange={this.handleFamilyChange}
        handleReset={this.handleReset} handleSubmit={this.handleSubmit}
        currentSearch={this.state.currentSearch} addFontsChosen={this.addFontsChosen}/>
      <Featured/>
      <Articles/>
      <About/>
      <footer className="footer">Google Font API coded by Adam Shaffer</footer>
    </div>
    <div id="fontsChosen">
      <div className="inputRow">
      <label>@import</label>
      <input type="text" readOnly value={this.state.importString}></input>
      </div>
      <div className="inputRow">
      <label>standard</label>
      <input type="text" readOnly value={this.state.standardString}></input>
      </div>
    </div>

  </div>
  );
  }
}

class Catalog extends React.Component {


  render() {
    return (<div className="Catalog">
      <Link fontFamilies={this.props.fontFamilies}/>
      <div className="underMenu">
        <input type="search" placeholder="search fonts" onChange={this.props.handleFamilyChange} value={this.props.currentSearch}></input>
        <input type="search" placeholder="sample text" onChange={this.props.handleTextChange} value={this.props.currentCustomSample}></input>
        <div className="instructions">
          Pick a font and choose a font size
        </div>
        <select name="fontSizes" onChange={this.props.handleFontChange} value={this.props.fontSize}>
          <option value="5">5px</option>
          <option value="10">10px</option>
          <option value="15">15px</option>
          <option value="20">20px</option>
          <option value="25">25px</option>
        </select>
        <button onClick={this.props.handleReset}>Reset</button>
      </div>
      <h1>Catalog</h1>

      <div className="cardGrid">
        <CardGrid fontFamilies={fontFamiliesFiltered(this.props.fontFamilies, this.props.filter, this.props.numCurrentDisplay)} fontSize={this.props.fontSize} sampleText={this.props.sampleText} addFontsChosen={this.props.addFontsChosen}/>
      </div>
      <button type="submit" onClick={this.props.handleSubmit}>More</button>
    </div>);
  }
}

const Link = (props) => {
  const fontArr = props.fontFamilies;
  const fontStr = `https://fonts.googleapis.com/css?family=${fontArr.join('|')}&display=swap`;
  return (<link href={fontStr} rel="stylesheet" type="text/css"/>);
};

const fontFamiliesFiltered = (fontFamilies, regExp, currentNum) => {
  if (regExp) {
    return fontFamilies.filter(fam => regExp.test(fam)).slice(0, currentNum);
  }
  return fontFamilies.slice(0, currentNum);
};

const CardGrid = (props) => {
  const Families = props.fontFamilies;
  const Size = props.fontSize;
  const Text = props.sampleText;
  const Cards = Families.map((fam, index) => <Card fontSize={Size} fontFamily={fam} sampleText={Text} key={index} addFontsChosen={props.addFontsChosen}/>);
  return (Cards);
};

class Card extends React.Component {
  render() {
    return (<div className="card" style={{
        fontFamily: this.props.fontFamily
      }}>
      <div className="topCardRow">
        <p>{this.props.fontFamily}</p>
        <button data-toggle="tooltip" data-placement="top" title="Add font family" onClick={() => {this.props.addFontsChosen(this.props.fontFamily)}}>
          <i className="fas fa-plus-circle"></i>
        </button>
      </div>
      <div className="cardBody" style={{
          fontSize: this.props.fontSize
        }}>
        {this.props.sampleText}
      </div>
    </div>);
  }
}

class Featured extends React.Component {
  render() {
    return (<div className="Featured">
      <h2>Featured Collections</h2>
      <div className="featuredRow">
        <div className="featuredTitle">
          Featured Collection: Plex
        </div>
        <div className="featuredDescription">
          IBM Plex™ is the new corporate typeface for IBM worldwide and an open source project developed by the IBM Brand & Experience team (BX&D). Plex is an international typeface family designed to capture IBM’s brand spirit and history, and to illustrate the unique relationship between mankind and machine—a principal theme for IBM since the turn of the century. The result is a neutral, yet friendly Grotesque style typeface that balances design with the engineered details that make Plex™ distinctly IBM. The family includes a Sans, Sans Condensed, Mono, and Serif and has excellent legibility in print, web and mobile interfaces. Plex’s three designs work well independently, and even better together. Use the Sans as a contemporary compadre, the Serif for editorial storytelling, or the Mono to show code snippets. The unexpectedly expressive nature of the italics give you even more options for your designs.
        </div>
        <div className="featuredCreated">
          <h3>
            Created by
            <a href="https://ibm.com/design" target="_blank" rel="noopener noreferrer">IBM Brand Experience and Design</a>
          </h3>
          <p>
            IBM Brand Experience & Design (BX&D) oversees the expression and strategic evolution of every IBM brand and sub-brand worldwide. Our work crosses research and strategy, communications and content development, symbology and systems, digital and physical experiences, tools and training. Ultimately, BX&D is here to make sure the role of the IBM brand is well understood and well represented—across the globe and across every experience.
          </p>
        </div>
      </div>
      <div className="featuredRow">
        <div className="featuredTitle">
          Featured Collection: SuperFamilies
        </div>
        <div className="featuredDescription">
          A superfamily is a set of typefaces—sans and serif designs for example, or regular, slab, and rounded variations—that are crafted to work together in close harmony. In contrast to pairing typefaces from different font families, superfamilies are often used when more visual cohesion is needed. UX designers might deploy a superfamily to delineate UI text (menus, tooltips) from editorial content (headlines, body copy), and to create a consistent tone with clear hierarchy, across an app or website.
        </div>
        <div className="featuredCreated">
          <h3>
            Created by
            <a href="https://design.google.com/" target="_blank" rel="noopener noreferrer">Google Design</a>
          </h3>
          <p>
            Google Design is a cooperative effort led by a group of designers, writers and developers at Google. We work across teams to create tools, resources, events and publications that support and further design and technology both inside and outside of Google.
          </p>
        </div>
      </div>
      <div className="featuredRow">
        <div className="featuredTitle">
          Featured Collection: 2016 Fonts Refresh
        </div>
        <div className="featuredDescription">
          With the help of typeface designers and font engineers from around the world, we started improving quality across our collection in 2016. Design work focused on typefaces that are widely used and have great potential, adding glyphs to support more languages, fixing incorrectly placed or shaped accent marks, re-spacing the type’s metrics and kerning, and in some cases re-drawing the designs from scratch.
        </div>
        <div className="featuredCreated">
          <h3>
            Created by
            <a href="https://design.google.com/" target="_blank" rel="noopener noreferrer">Google Design</a>
          </h3>
          <p>
            Google Design is a cooperative effort led by a group of designers, writers and developers at Google. We work across teams to create tools, resources, events and publications that support and further design and technology both inside and outside of Google.
          </p>
        </div>
      </div>
    </div>);
  }
}

class Articles extends React.Component {
  render() {
    return (<div className="Articles">
      <h2>Articles</h2>
      <div className="articleRow">
        <div className="articleTitle">
          <a href="https://design.google/library/hot-type-always-fresh/" target="_blank" rel="noopener noreferrer">
            Hot Type, Always Fresh
          </a>
        </div>
        <div className="articleDescription">
          Get to know how the Google Fonts API keeps your type up-to-date and increasingly efficient
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
          Designers are finally doing justice to the complex, contextual alphabet with a fresh approach to Arabic fonts and digital typography.
        </div>
        <div className="type">
          Editorial
        </div>

      </div>
      <div className="articleRow">
        <div className="articleTitle">
          <a href="https://design.google/library/new-wave-indian-type-design/" target="_blank" rel="noopener noreferrer">
            The New Wave of Indian Type
          </a>
        </div>
        <div className="articleDescription">
          Studying the open source, collaborative work of Indian typographers, as a model for global font design.
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
          Highlighting the design process behind expanded language support in Google Docs and Slides.
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
          Explore typefaces crafted to combine harmoniously, with this featured collection on Google Fonts
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
          Watch talks by leading thinkers and practicioners in type design including Paula Scher, Roger Black, Dan Rhatigan, and Santiago Orozco.
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
          Learn how to build an app with distinctive typography using Android Studio's downloadable fonts feature
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
          The story behind a new monospaced typeface by Colophon Foundry for Google Fonts
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
          The new Google Fonts make it easier than ever to browse our collection of open source designer fonts and learn more about then people who make them.
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
        Google fonts is an excellent resources for web designers and developers. Over 96 open source fonts are made available at the
        <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer">
          Google Fonts Site</a>
        These fonts are contributions from highly skilled designers from around then world. Google offers all the fonts in the catalog are free and open source.
      </p>
      <p>
        The app utilizes Google's API to present these fonts to you. The underlying code utilizes HTML, CSS, SCSS and JavaScript. In addition, the React Library handles rendering and presentation of UI elements. The current version of this app is a simple beta version. Future updates will add more capabilities such as font selection and more refined search abilities.
      </p>
    </div>);
  }
}

export default App;
