import React, {Component} from 'react';
import Catalog from './Containers/Catalog'

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
      const fontArray = this.state.fontFamilies;
      const fontStr = `https://fonts.googleapis.com/css?family=${fontArray.join('|')}&display=swap`;
      document.querySelector('head link[type="text/css"]').setAttribute('href',fontStr);
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
              featured
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


export default App;
