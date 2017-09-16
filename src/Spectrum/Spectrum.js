import React, { Component } from 'react';
import './Spectrum.css';

class Spectrum extends Component {
	constructor(props) {
		super(props);

		

		this.state = {
			units: 50,
			emInWinWidth: null,
			emInWinHeight: null
		};

		this.setEmsLength = this.setEmsLength.bind(this);
		this.getRandomInt = this.getRandomInt.bind(this);
	}

	componentDidMount() {
		this.setEmsLength();

		window.addEventListener("resize", this.setEmsLength);
	}

    componentWillUnmount() {
        window.removeEventListener("resize", this.setEmsLength);
    }

	setEmsLength() {
		// How many em's would fit in viewport width
		let emInWinWidth = window.innerWidth /
		parseFloat(getComputedStyle(document.querySelector('body'))['font-size']);

		let emInWinHeight = window.innerHeight /
			parseFloat(getComputedStyle(document.querySelector('body'))['font-size']);

		this.setState({
			// (emInWinWidth - 2) because the bars tend to overflow the innerWidth
			emInWinWidth: (emInWinWidth - 1),
			emInWinHeight: emInWinHeight
		});
	}

	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getRandomASCII() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-[]{}\\/.,><";
	  
		for (var i = 0; i < 1; i++)
		  text += possible.charAt(Math.floor(Math.random() * possible.length));
	  
		return text;
	}
	getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

  	render() {
		const waveStyle = {
			display: 'inline-block',
			boxSizing: 'border-box',
			width: (this.state.emInWinWidth/this.state.units + 'em'),
			height: '100%',
			// border: '1px solid black',
			verticalAlign: 'top',
			backgroundColor: 'yellow'
		};
		// console.log(
		// 	window.innerHeight,
		// 	(window.innerHeight*0.8)/parseFloat(getComputedStyle(document.querySelector('body'))['font-size']),
		// 	this.state.emInWinWidth/this.state.units
		// );

		var waveDivs = [];
		var maxBarDivs = Math.ceil((window.innerHeight*0.8)/parseFloat(getComputedStyle(document.querySelector('body'))['font-size']));
		for (var i = 0; i < this.state.units; i++) {
			var barDivs = new Array(maxBarDivs);
			var filledBarDivs = Math.floor(this.props.waveformData[i]/(200/maxBarDivs));
			// if (this.props.waveformData) {
			// 	//console.log(Math.floor(this.props.waveformData[i]/2));
			// 	filledBarDivs = Math.floor(this.props.waveformData[i]/(200/maxBarDivs));
			// }
			// else
			// 	filledBarDivs = Math.ceil(Math.random() * maxBarDivs) + 1;
			//console.log('mbd', (200/maxBarDivs));
			for (var j = 0; j < maxBarDivs; j++) {
				var el = <span style={{backgroundColor: this.getRandomColor()}}>►</span>;
				// filledBarDivs-2 dunno why, the alrogithm needs to be revisioned
				if (j < filledBarDivs-2)
					el = <span>&nbsp;</span>;
				barDivs[j] = (
					<div style={{position: 'relative', lineHeight: '1em', top: '0px', backgroundColor: 'white'}}>
						{el}
					</div>
				);
			}

			waveDivs.push(
				<div style={waveStyle}>
					{barDivs}
				</div>
			);
		}

		return (
			<div className="Spectrum">
				{waveDivs}
				{/* Spectrum */}
			</div>
		);
	}
}

export default Spectrum;
