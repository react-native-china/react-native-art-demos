import React, { Component } from 'react';
import RN,{
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

var points = [
	[rnd(0,5),rnd(0,5),rnd(0,5),rnd(0,5),rnd(0,5)],
	[rnd(0,5),rnd(0,5),rnd(0,5),rnd(0,5),rnd(0,5)],
	[rnd(0,5),rnd(0,5),rnd(0,5),rnd(0,5),rnd(0,5)]
]

export default class Chart extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	line:{
	  		x:-1,
	  		y:-1
	  	},
	  	position:{
	  		left:0,
	  		top:0
	  	}
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
		this.refs.layout.measure((x, y, width, height, pageX, pageY) => {

			this.setState({
				position:{
					left:pageX,
					top:pageY
				}
			})
		})

		this.setState({
			line:{
				x:gestureState.x0,
				y:gestureState.y0
			}
		})
	}

	_handlePanResponderMove = (e, gestureState) => {

		this.setState({
			line:{
				x:gestureState.moveX,
				y:gestureState.moveY,
			}
		})
	}

	_handlePanResponderEnd = () => {
		this.setState({
			line:{
		  		x:-1,
		  		y:-1
		  	}
		})
	}

	_handleStartShouldSetPanResponder(){
	  return true;
	}

	_handleMoveShouldSetPanResponder(){
	  return true;
	}

	componentDidMount(){

		setTimeout(() => {
			this.refs.layout.measure((x, y, width, height, pageX, pageY) => {

				this.setState({
					position:{
						left:pageX,
						top:pageY
					}
				})
			})
		})
	}

	render(){
		return(
			<View {...this._panResponder.panHandlers} ref="layout">
				<Surface width="400" height="400" visible="true" style={{backgroundColor:'#F8F8F8'}}>
					{ this.getAxis() }
					{ this.getRadar() }
					{ this.getLine() }
				</Surface>
			</View>
		)
	}

	getLine = () => {
		var {
			line,
			position
		} = this.state;

		return (
			<Shape d={
				new Path()
					.moveTo(line.x + position.left,0)
					.lineTo(line.x + position.left,400)
					.moveTo(0,line.y - position.top)
					.lineTo(400,line.y - position.top)
				} stroke="black" strokeWidth=".2"></Shape>
		)
	}

	getAxis = () => {
		return (
			<Shape d={ 
				this.getCircleD()
			} 
			stroke="#4990E2" 
			strokeWidth="4" 
			strokeJoin = "bevel"
			transform={
				new Transform()
					.rotate(-90,160,200)
			}></Shape>
		)
	}

	getCircleD(){
		var [x,y,r] = [160,200,100];

		var path = new Path();
		var points = [];
		var count = 5

		for( var index = 0; index < count;index++){
			points.push(this.getPointAtCircle(x,y,r,index*360/count))
		}

		points.forEach((p,i) => {
			if( i == 0 ){
				path.moveTo(p.x,p.y)
			} else {
				path.moveTo(points[i-1].x,points[i-1].y)
				path.lineTo(p.x,p.y)
				path.lineTo(x,y)
			}

			if( i == points.length - 1 ){
				path.moveTo(points[i-1].x,points[i-1].y)
				path.lineTo(p.x,p.y)
				path.lineTo(x,y)
				path.moveTo(p.x,p.y)
				path.lineTo(points[0].x,points[0].y)
				path.lineTo(x,y)
			}
		})

		return path.close();
	}

	getPointAtCircle(ox,oy,r,angle){
		return {
			x:Math.cos(angle/180*Math.PI)*r + ox,
			y:Math.sin(angle/180*Math.PI)*r + oy
		}
	}

	getRadar(){
		return points.map((pArray) => {
			return (
				<Shape d={
					new Path()
						.lineTo(100,10)
						.lineTo(20,100)
				} stroke="black" strokeWidth="2"></Shape>
			)
		})

	}
}

function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n)
}