import React, {Component} from 'react';
import Card from './Card'

export default class CardGrid extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return (
		this.props.fontFamilies.map((fam,index) => 
									<Card fontSize={this.props.fontSize}
									fontFamily={fam.replace(/\+/g,' ')}
									sampleText={this.props.sampleText}
									key={index}
									addFontsChosen={this.props.addFontsChosen} />
		)
		)
	}

}
