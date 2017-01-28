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
	[122,234],
	[190,290],
	[228,148],
	[279,254],
	[399, 45]
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
					<Shape d={this.getD()} stroke={'#4990E2'} 
						strokeWidth="1" 
						onClick={this.clickHandler}
						></Shape>
					<Shape d={this.getD(true)}
						strokeWidth="1" 
						onClick={this.clickHandler}
						fill={new LinearGradient({'.1': '#98CEFF', '0.8': 'rgba(255,255,255,0)'},"0","0","0","400")}
						></Shape>
					{ this.getCircles() }
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

	getCircles = () => {
		return (
			points.map((p,index) => {
				var active = (this.state.line > p[0]-2 && this.state.line < p[0]+2);
				var color = active?'#4990E2':"white"

				return (
					<Group key={index}>
						<Shape d={new Path()
							.move(0, 2)
							.arc(4, 0, 2, 2)
							.arc(-4, 0, 2, 2)
							.close()
						} transform={ new Transform().move(p[0]-2,p[1]-2) } key={index} stroke="#4990E2" fill={color}></Shape>
						{ 
							active ? 
							<Text font={
									`8px "Helvetica Neue", "Helvetica", Arial`
								} 
								fill="black"
								x={p[0]-10}
								y={p[1]-20}

							>{p[0]} </Text>:
							<Shape/>
						}
					</Group>
				)
			})
		)
	}

	circle(path){
		// return (
		// 	path
		// 	.moveTo(cx,cy)
		// 	.arc(,,r,r)
		// )
	}

	getD = (fill) => {
		var path = new Path();

		path.moveTo(400,400)

		if( fill ){
			path.lineTo(0,400/1)
		} else {
			path.moveTo(0,400)
		}

			path
			.curveTo(10/1 			  ,400/1 		   ,points[0][0] - 10,points[0][1],points[0][0],points[0][1])
			.curveTo(points[0][0] + 10,points[0][1],points[1][0] - 10,points[1][1],points[1][0],points[1][1])
			.curveTo(points[1][0] + 10,points[1][1],points[2][0] - 10,points[2][1],points[2][0],points[2][1])
			.curveTo(points[2][0] + 10,points[2][1],points[3][0] - 10,points[3][1],points[3][0],points[3][1])
			.curveTo(points[3][0] + 10,points[3][1],points[4][0] - 10,points[4][1],points[4][0],points[4][1])
			// .moveTo(400/1,400/1)
			// .lineTo(0,440/1)
			// .close()

		return path;
	}

	getCircle = () => {
		return (
			new Path()
			.moveTo(0,0)
			.arc(100,100,10,10,100,false,10)
		)
	}

	clickHandler = () => {
		alert(1);
	}
}