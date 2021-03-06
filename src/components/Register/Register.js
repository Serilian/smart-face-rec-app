import React, {Component} from 'react';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    }

    onNameChange = (event) => {
        this.setState({
            registerName: event.target.value
        })
    };

    onEmailChange = (event) => {
        this.setState({
            registerEmail: event.target.value
        });
    };
    onPasswordChange = (event) => {
        this.setState({
            registerPassword: event.target.value
        });
    };

    onRegisterSubmit = () => {
        const {updateUserData} = this.props;
        const newUser = {
            name: this.state.registerName,
            password: this.state.registerPassword,
            email: this.state.registerEmail
        };

        fetch('https://peaceful-journey-34211.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    updateUserData(user);
                    this.props.onRouteChange('home');
                } else {
                    alert(user);
                }
            })
            .catch(err => console.log(err))

    };


    render() {
        const {onRouteChange} = this.props;

        return (
            <div>
                <article className="pa1 br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input
                                    onChange={this.onNameChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    required/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    required/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    minLength="5"
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onRegisterSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit" value="Register"/>
                        </div>
                        <div className="lh-copy mt3 pointer">
                            <p onClick={() => onRouteChange('signin')} className="f6 link dim black db ">Sign in</p>

                        </div>
                    </div>
                </article>
            </div>
        )
    }

}


export default Register;