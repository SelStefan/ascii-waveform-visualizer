import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false
    };

    // set initial volume
    this.props.setVolume(50/100);

    this.setPlayer = this.setPlayer.bind(this);
  }

  setPlayer(playing) {
    //console.log(window.location.pathname.replace(/^\/([^\/]*).*$/, '$1'));

    this.setState({
      playing: playing
    }, ()=>{
      console.log(playing, this.state.playing);
      this.props.playAudio(playing);
    });
  }

  getRandomASCII() {
		var text = "";
		var possible = "A";
	  
		for (var i = 0; i < 1; i++)
		  text += possible.charAt(Math.floor(Math.random() * possible.length));
	  
		return text;
	}

  render() {
    let playElement = (
      <div onClick={() => this.setPlayer(true)} style={{width: '100px', paddingLeft: '0px', margin: 'auto'}}>
        
        <span style={{fontSize: '12vh'}} className="glyphicon glyphicon-play"></span>
        {/* |►|<br/>
        &nbsp;&nbsp;&nbsp;
        |►   ►|<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        |►   ►   ►|<br/>
        &nbsp;&nbsp;&nbsp;
        |►   ►|<br/>
        |►|<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Play */}
      </div>
    );

    let stopElement = (
      <div onClick={() => this.setPlayer(false)} style={{width: '100px', margin: 'auto'}}>
        <span style={{fontSize: '12vh'}} className="glyphicon glyphicon-stop"></span>
        {/* ██████<br/>
        █&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;█<br/>
        █&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;█<br/>
        █&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;█<br/>
        ██████<br/>
        Stop */}
      </div>
    );

    return (
      <div className="Player">
        <div className="menu">
          <div className="menu">
            {/* <div className="input-icon-wrap" style={{width: '75%', height: '50px', marginTop: '5%', marginLeft: '5%'}}>
              <span className="input-icon"><span className="glyphicon glyphicon-user"></span></span>
              <input type="text" className="input-with-icon" id="form-name"/>
            </div>  	 */}
          </div>
          <div className="menu">
            <div style={{width: '100%'}}>
              {( !this.state.playing ? playElement : stopElement )}
              <input onChange={(e)=>{this.props.setVolume(e.target.value/100)}} type="range" min="0" max="100" />
            </div>
          </div>
          <div className="menu"></div>
        </div>
        {/* Player&#9658;<br/> */}
        {/* {( !this.state.playing ? playElement : stopElement )}
        <input onChange={(e)=>{this.props.setVolume(e.target.value/100)}} type="range" min="0" max="100" /> */}
      </div>
    );
  }
}

export default Player;
