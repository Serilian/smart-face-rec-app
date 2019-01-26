import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from "./components/Signin/Signin";
import Register from './components/Register/Register';


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

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedin: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: null
    }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    };

    displayFaceBox = (box) => {
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
        fetch('http://localhost:3000/imageUrl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({input: this.state.input})
        })
            .then(resp => resp.json())
            .then((response) => {
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({id: this.state.user.id})
                    })
                        .then(resp => resp.json())
                        .then(count => {
                            this.setState({
                                user: {
                                    ...this.state.user,
                                    entries: count
                                }
                            })
                        })
                        .catch(err => console.log(err));
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err))

    };

    updateUserData = (user) => {
        this.setState({user: user});
    };

    onRouteChange = (route) => {
        this.setState({route: route});
        if (route === 'signout') {
            this.setState(initialState);
        } else if (route === 'home') {
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
                        <Rank
                            entries={this.state.user.entries}
                            name={this.state.user.name}/>
                        < ImageLinkForm buttonSubmit={this.buttonSubmitHandler}
                                        onInputChange={this.inputChangeHandler}/>
                        <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </>
                    : (
                        route === 'signin' ?
                            <Signin updateUserData={this.updateUserData} onRouteChange={this.onRouteChange}/>
                            :
                            <Register updateUserData={this.updateUserData} onRouteChange={this.onRouteChange}/>
                    )
                }
            </div>
        );
    }
}

export default App;
