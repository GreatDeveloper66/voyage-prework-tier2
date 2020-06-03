import React, {Component} from 'react';
import FontCard from './FontCard'

export default class CardGrid extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return (
		this.props.fontFamilies.map((fam,index) => 
									<FontCard fontSize={this.props.fontSize}
									fontFamily={fam.replace(/\+/g,' ')}
									sampleText={this.props.sampleText}
									key={index}
									addFontsChosen={this.props.addFontsChosen} />
		)
		)
	}

}
