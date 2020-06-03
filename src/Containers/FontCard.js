import React, {Component} from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core'

export default class FontCard extends React.Component {
  render() {
    return (<Card style={{
        fontFamily: this.props.fontFamily
      }}>
      <CardContent>
        <p>{this.props.fontFamily}</p>
        <button data-toggle="tooltip" data-placement="top" title="Add font family" onClick={() => {this.props.addFontsChosen(this.props.fontFamily)}}>
          <i className="fas fa-plus-circle"></i>
        </button>
      </CardContent>
	  <CardContent style={{
          fontSize: this.props.fontSize
        }}>
     
        {this.props.sampleText}
      </CardContent>
    </Card>);
  }
}
