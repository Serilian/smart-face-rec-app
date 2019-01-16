import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import {CLARIFAIAPIKEY} from "./app.properties";
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
    apiKey: CLARIFAIAPIKEY
});


const particlesOptions = {
    particles: {
        number: {
            value: 120
        },
        density: {
            enable: true,
            value_area: 800
        },
        color: {
            value: ['#ffffff']
        },
        line_linked: {
            color: '#ffffff',
            opacity: 1
        }
    },

};


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
            imageUrl: ''
        }
    }

    inputChangeHandler = (event) => {
        const inputValue = event.target.value;
        this.setState({
            input: inputValue
        });

    };

    buttonSubmitHandler = () => {
        this.setState({
            imageUrl: this.state.input
        });
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(
                function (response) {
                    console.log('Success:');
                    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
                },
                function (err) {
                    console.log('Error:');
                    console.log(err);
                }
            );
    };


    render() {
        return (
            <div className="App">
                <Particles className="particles"
                           params={particlesOptions}
                />
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm buttonSubmit={this.buttonSubmitHandler} onInputChange={this.inputChangeHandler}/>
                <FaceRecognition imageUrl={this.state.imageUrl}/>
            </div>
        );
    }
}

export default App;
