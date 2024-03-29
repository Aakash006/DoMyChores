import "./Login.css";
import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";

/* Class to render login page */
export class Login extends React.Component {
    /* class constructor to initialize the props and states */
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };
    }

    /* Handle change method and update state based on event */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    /* fetch user information once the user clicks on the login button */
    login = (event) => {
        event.preventDefault();
        fetch(`/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'username': this.state.username,
                'password': this.state.password
            })
        })
            .then(res => res.json())
            .then(dat => {
                if (dat.id) {
                    localStorage.setItem('id', dat.id);
                    localStorage.setItem('email', dat.email);
                    localStorage.setItem('userType', dat.userType);
                    localStorage.setItem('username', dat.username);
                    window.location.replace(`${window.location.protocol + '//' + window.location.host}/dashboard`);
                } else {
                    console.log('Error')
                }
            });
    };

    /* Render the component */
    render() {
        return (
            <div className="app">
                <Container className="login">
                    <h2 style={{color: 'black'}}>Login</h2>
                    <Form onSubmit={this.login}>
                        <Form.Group controlid="formBasicEmail">
                            <Form.Row>
                                <Form.Label className="label">Username</Form.Label>
                                <Form.Control
                                    type="string"
                                    placeholder="Username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </Form.Row>
                        </Form.Group>
                        <Form.Group controlid="formBasicPassword">
                            <Form.Row>
                                <Form.Label className="label">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row>
                                <Button
                                    className="submitBtn"
                                    variant="primary"
                                    type="submit"
                                >
                                    Login
                            </Button>
                            </Form.Row>
                        </Form.Group>
                    </Form>
                    <a href="/register">Don't have an account? Register</a>
                </Container>
            </div>
        );
    }
}

export default withRouter(Login);
