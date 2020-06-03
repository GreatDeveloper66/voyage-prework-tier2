import React, {Component} from 'react';

export default class Card extends React.Component {
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
