import React, {Component} from 'react';
import FontCard from './FontCard'
import { Grid } from '@material-ui/core'

export default class CardGrid extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return (
		<Grid container spacing={1}>
			{
					this.props.fontFamilies.map((fam,index) => 
									<Grid container item xs={12} sm={6} lg={4}>
									<FontCard fontSize={this.props.fontSize}
									fontFamily={fam.replace(/\+/g,' ')}
									sampleText={this.props.sampleText}
									key={index}
									addFontsChosen={this.props.addFontsChosen} />
									</Grid>)
				
			}
		
		</Grid>
	
		)
	}

}
