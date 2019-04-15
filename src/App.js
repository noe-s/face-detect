import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: '90eb62b6379f4f8faedc291815e0d843'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 300,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  };
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input })
      app.models.predict(
        Clarifai.COLOR_MODEL, 
        this.state.input).then(
      function(response) {
        console.log(response);
      },
      function(err) {
        console.log(err);
      }
    );
  };

  onRouteChange = (route) => {
    if(route ==='signout') {
      this.setState({isSignedIn: false})
    } else if(route ==='home') {
      this.setState({route: route });
    }
  }

  isSignedIn = () => {
    console.log('signin')
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' //if state is signin, load these components
          ? <div>     
              <Logo /> 
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition imageUrl={imageUrl}/>
            </div>
          : (
            this.state.route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
