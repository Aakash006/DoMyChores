import "./Register.css";
import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router";
import { toast } from 'react-toastify';

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            userType: "N/A",
            username: "",
            password: "",
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    register = (event) => {
        event.preventDefault();
        fetch(`/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'username': this.state.username,
                'password': this.state.password,
                'email': this.state.email,
                'userType': this.state.userType
            })
        })
            .then(res => res.json())
            .then(dat => this.props.history.push("/login"));
    };

    render() {
        return (
            <div className="app">
                <Container className="register">
                    <h2>Register</h2>
                    <Form onSubmit={this.register}>
                        <Form.Row controlid="formBasicEmail">
                            <Form.Label className="label">Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </Form.Row>

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

                        <Form.Row controlid="formBasicEmail">
                            <Form.Label className="label">User Type</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="userType"
                                value={this.state.userType}
                                onChange={this.handleChange}
                            >
                                <option>N/A</option>
                                <option>Customer</option>
                                <option>Service Provider</option>
                            </Form.Control>
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
                                Register
                            </Button>
                        </Form.Row>
                    </Form>
                    <a href="/login">Have an account already? Login</a>
                </Container>
            </div>
        );
    }
}

export default withRouter(Register);
