import React, { Component } from 'react';
import {
	ART,
	View,
	PanResponder
} from 'react-native';

const {
	Surface,
	Shape,
	Text,
	LinearGradient,
	Transform,
	Path,
	Group
} = ART;

// import {
// 	Tween,
// 	Path
// } from 'art/morph/path';

var points = [
	getRnd(100,1000),
	getRnd(100,1000),
	getRnd(100,1000),
	getRnd(100,1000),
	getRnd(100,1000)
]

import sss from 'art/shapes/ellipse';

console.log(sss);

export default class Chart extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	line:-1
	  };
	}

	componentWillMount(){

		this._panResponder = PanResponder.create({
		  onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
		  onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
		  onPanResponderGrant: this._handlePanResponderGrant,
		  onPanResponderMove: this._handlePanResponderMove,
		  onPanResponderRelease: this._handlePanResponderEnd,
		  onPanResponderTerminate: this._handlePanResponderEnd,
		});
	}

	_handlePanResponderGrant = (e, gestureState) => {
		this.setState({
			line:gestureState.x0
		})
	}

	_handlePanResponderMove = (e, gestureState) => {
		this.setState({
			line:gestureState.moveX
		})
	}

	_handlePanResponderEnd = () => {
		this.setState({
			line:-1
		})
	}

	_handleStartShouldSetPanResponder(){
	  return true;
	}

	_handleMoveShouldSetPanResponder(){
	  return true;
	}

	render(){
		return(
			<View {...this._panResponder.panHandlers}>
				<Surface width="400" height="400" visible="true" style={{backgroundColor:'#F8F8F8'}}>
					{ this.getBars() }
					{ this.getLine() }
				</Surface>
			</View>
		)
	}

	getLine = () => {
		var {
			line
		} = this.state;

		return (
			<Shape d={new Path().moveTo(line,0).lineTo(line,400)} stroke="black" strokeWidth=".2"></Shape>
		)
	}

	getBars = () => {
		var max = Math.max.apply(null,points) + 100;
		return points.map((p,index) => {
			var active = this.state.line > index*300/points.length && this.state.line < index*300/points.length+40
			return (
				<Shape 
					key={index}
					d={
						new Path()
							.moveTo(index*300/points.length,(1-p/max)*400)
							.lineTo(index*300/points.length+40,(1-p/max)*400)
							.lineTo(index*300/points.length+40,400+2)
							.lineTo(index*300/points.length,400+2)
							.close()
					}

					fill={active?"white":"#4990E2"}
					stroke='#4990E2'
				></Shape>
			)
		})
	}

	
}

function getRnd(n,m){
	return parseInt(Math.random()*(m-n)+n)
}