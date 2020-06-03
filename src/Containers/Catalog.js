import React, {Component} from 'react';
import CardGrid from './CardGrid'

export default class Catalog extends React.Component {
  render() {
    return (<div className="Catalog">

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
      <button type="submit" onClick={this.props.handleSubmit} id="more">More</button>
    </div>);
  }
}


const fontFamiliesFiltered = (fontFamilies, regExp, currentNum) => {
  if (regExp) {
    return fontFamilies.filter(fam => regExp.test(fam)).slice(0, currentNum);
  }
  return fontFamilies.slice(0, currentNum);
};
