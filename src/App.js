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
import Signin from "./components/Signin/Signin";
import Register from './components/Register/Register';

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
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedin: false
        }
    }


    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(width, height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    };

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({box: box});
    };

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
            .then((response) => this.displayFaceBox(this.calculateFaceLocation(response))
            )
            .catch(err => console.log(err))

    };

    onRouteChange = (route) => {
        this.setState({route: route});
        if(route === 'signout') {
            this.setState({isSignedin: false})
        } else if (route === 'home'){
            this.setState({isSignedin: true})
        }

    };



    render() {
        const {isSignedin, imageUrl, route, box} = this.state;
        return (
            <div className="App">
                <Particles className="particles"
                           params={particlesOptions}
                />
                <Navigation isSignedin={isSignedin} onRouteChange={this.onRouteChange}/>

                {route === 'home' ?
                    <>
                        <Logo/>
                        <Rank/>
                        < ImageLinkForm buttonSubmit={this.buttonSubmitHandler}
                                        onInputChange={this.inputChangeHandler}/>
                        <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </>
                    : (
                        route === 'signin' ?
                            <Signin onRouteChange={this.onRouteChange}/>
                            :
                            <Register onRouteChange={this.onRouteChange}/>
                    )
                }
            </div>
        );
    }
}

export default App;
