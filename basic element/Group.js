import React, { Component } from 'react';
import { ART } from 'react-native';
const { Shape,Group } = ART;

/*
 * The Group element is a wrapper who wrap two or more shapes together.
 * As react doesn't allow multi root element at jsx.
 */


export default class GroupDemo extends Component{
	render(){
		return (
			<Suface width="200" height="200">
				{ this.getTwoLines() }
			</Suface>
		)
	}

	getTwoLines(){
		return (
			<Group>
				<Shape d={ new Path().moveTo(0,0).lineTo(200,200) } stroke="green"></Shape>
				<Shape d={ new Path().moveTo(200,0).lineTo(0,200) } stroke="green"></Shape>
			</Group>
		)

		/*
			error:
			return (
				<Shape></Shape>
				<Shape></Shape>
			)
		*/
	}
}