import "./Login.css";
import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

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

    render() {
        return (
            <div className="app">
                <Container className="login">
                    <h2>Login</h2>
                    <Form onSubmit={this.login}>
                        <Form.Row controlid="formBasicEmail">
                            <Form.Label className="label">Username</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </Form.Row>

                        <Form.Row controlid="formBasicPassword">
                            <Form.Label className="label">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </Form.Row>
                        <Form.Row>
                            <Button
                                className="submitBtn"
                                variant="primary"
                                type="submit"
                            >
                                Login
                            </Button>
                        </Form.Row>
                    </Form>
                    <a href="/register">Don't have an account? Register</a>
                </Container>
            </div>
        );
    }
}

export default withRouter(Login);
