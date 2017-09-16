import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Spectrum from './Spectrum/Spectrum';
import Player from './Player/Player';

class App extends Component {
  constructor(props) {
    super(props);

    this.audio = new Audio();
    this.audio.crossOrigin = 'Anonymous';
    // this.audio.src = "http://radioas.kbcnet.rs:8020/;*.mp3";

    this.analyser = require('web-audio-analyser')(this.audio);

    this.interval;

    this.state = {
      waveformData: new Array(50),
      count: 0
    }

    this.playAudio = this.playAudio.bind(this);
    this.setVolume = this.setVolume.bind(this);
  }

  componentDidMount() {
    //this.playAudio(true);
    this.playAudio(false);
  }

  playAudio(play) {
    if (play) {
      clearInterval(this.interval);

      let audioSrc = (window.location.pathname+window.location.search).substr(1);
      // console.log(audioSrc.split("src/").pop());
      this.audio.src = audioSrc.split("src/").pop();
      // console.log(audioSrc.split("src").pop());

      this.audio.play();
      this.interval = setInterval(() => {
        let units = 50;
        let jumpVal = Math.floor(this.analyser.waveform().length/units);
        let data = new Array();
        //console.log('jumpVal:', jumpVal);
        for (let j = 0; j < this.analyser.waveform().length; j++) {
          if (j % jumpVal == 0) {
            //console.log('hi');
            //data[j] = this.analyser.waveform()[j];
            data.push(this.analyser.waveform()[j]);
            //console.log(j, this.analyser.waveform()[j]);
          }
          //console.log('j: ', j, this.analyser.waveform()[j]);
        }

        // for (let i = 0; i < units; i++) {
        //   data[i] = this.analyser.waveform()[jumpVal*i]
        // }
        //console.log(this.analyser.waveform(), data);
        this.setState({
          waveformData: data
        });
        //console.log(this.analyser.waveform())
      }, 10);
      
    }
    else {
      clearInterval(this.interval);

      this.audio.pause();

      this.setState({
        waveformData: [...Array(50)].map(()=>230),
        count: 0
      }, () => {
        this.interval = setInterval(() => {
          //console.log(this.state.count);

          if (this.state.count < 50) {
            let sinJump = (Math.PI/0.25)/50;
            //console.log(Math.floor(((sinJump*this.state.count) % (Math.PI*2)) * 63));
            let newWaveFormData = this.state.waveformData;
            newWaveFormData[this.state.count] = 230 - Math.floor( Math.sin((sinJump*this.state.count) % Math.PI) * 63)*3;

            this.setState({ waveformData: newWaveFormData })
            //this.setState({ waveformData: [...Array(50)].map(()=>(200-50)) })
          }
          else if (this.state.count >= 50 && this.state.count <= 100) {
            let sinJump = (Math.PI/0.25)/50;
            //console.log(Math.floor(((sinJump*this.state.count) % (Math.PI*2)) * 63));
            let newWaveFormData = this.state.waveformData;
            newWaveFormData[50-(this.state.count-50)] = 230;

            this.setState({ waveformData: newWaveFormData })
            //this.setState({ waveformData: [...Array(50)].map(()=>(200-50)) })
          }
          else  {
            this.setState({
              count: 0,
              waveformData: [...Array(50)].map(()=>230) });
          }
            // data[this.state.count] = Math.floor((Math.sin(this.state.count/Math.PI)+1)*50)

          this.setState({ count: this.state.count + 1 })

          // let units = 50;
          // let data = new Array(units);
          // console.log(Math.floor((Math.sin(this.state.idleRad)+1)*50), this.state.idleRad);
          // data.push(Math.floor((Math.sin(this.state.idleRad)+1)*50));
  
          // this.state.idleRad += 0.1;
        }, 10);
      });

    }
  }

  setVolume(volume) {
    this.audio.volume = volume;
  }

  render() {
    return (
      <div className="App">
        {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Spectrum waveformData={this.state.waveformData} />
        <Player playAudio={this.playAudio} setVolume={this.setVolume} />
      </div>
    );
  }
}

export default App;
