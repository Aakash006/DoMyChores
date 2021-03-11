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
        localStorage.setItem("id", 1);
        this.props.history.push("/dashboard");
    };

    render() {
        return (
            <div className="app">
                <Container>
                    <h2>Login</h2>
                    <Form onSubmit={this.login}>
                        <Form.Row controlId="formBasicEmail">
                            <Form.Label className="label">Username</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </Form.Row>

                        <Form.Row controlId="formBasicPassword">
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
