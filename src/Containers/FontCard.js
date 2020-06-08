import React, {Component} from 'react';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core'

export default class FontCard extends React.Component {
  render() {
    return (<Card style={{
        fontFamily: this.props.fontFamily
      }}>
      <CardContent>
        {this.props.fontFamily}
        
      </CardContent>
	  <CardContent style={{
          fontSize: this.props.fontSize
        }}>
     
        {this.props.sampleText}
      </CardContent>
	  <CardActions>
		<button style={{width: "30px"}}data-toggle="tooltip" data-placement="top" title="Add font family" onClick={() => {this.props.addFontsChosen(this.props.fontFamily)}}>
          <i className="fas fa-plus-circle"></i>
        </button>
	  </CardActions>
    </Card>);
  }
}
