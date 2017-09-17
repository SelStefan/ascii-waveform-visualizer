# Radio Ascii

An ascii audio waveform visualizer made in React.
<h3><a href="https://selstefan.github.io/radio-ascii/src/http://secure.live-streams.nl/opus.opus">Demo</a></h3>

# Requirements

For this project you will need 
- [**git**](https://git-scm.com/) 
- [**node**](https://nodejs.org/) with **npm**


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Todo](#todo)

## Installation

```sh
git clone https://github.com/SelStefan/radio-ascii.git
cd radio-ascii
npm install
```

## Usage

#####  Development server
Run ```npm start``` in the base project folder for a dev server. Navigate to http://localhost:3000. The app will automatically reload if you change any of the source files.

##### Giving a path to an audio source
If you have started the development server and pushed the large play ► button, and no music started coming out, don't panic, the case is probably that you just didn't set a path to an audio source in the url.
To set an audio source path, in the adress bar of your browser append ```/src/<your audio address>``` and press enter to navigate to the new url.
For example you can copy one of the audio address from http://dir.xiph.org/index.php and append it after ```src/``` in you your url: http://localhost:3000/src/http://secure.live-streams.nl/opus.opus
Now, after your navigate to the new url with the audio adress set, you can press the play button to watch the ascii waveform visualizations.

##### Build
Run ```npm run build``` to build the project. The static build artifacts will be stored in the build/ directory.

## Todo
* Optimize the ascii drawing algorithm
* Make the audio source selection more user friendly
* Add UI for ascii waveform manipulation

