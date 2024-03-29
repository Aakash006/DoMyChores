import "./Register.css";
import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router";

/* Class to render register page */
export class Register extends React.Component {
    /* class constructor to initialize the props and states */
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            userType: 'N/A',
            username: '',
            password: '',
        };
    }

    /* Handle change based on user input change */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    /* Query the server to create a new user on the sever */
    register = (event) => {
        event.preventDefault();
        fetch(`/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                userType: this.state.userType,
            }),
        })
            .then((res) => res.json())
            .then((dat) =>
                window.location.replace(
                    `${
                        window.location.protocol + '//' + window.location.host
                    }/login`
                )
            );
    };

    /* Render the component */
    render() {
        return (
            <div className='app'>
                <Container className='register'>
                    <h2 style={{ color: 'black' }}>Register</h2>
                    <Form onSubmit={this.register}>
                        <Form.Group controlid='formBasicEmail'>
                            <Form.Row>
                                <Form.Label className='label'>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='email@example.com'
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </Form.Row>
                        </Form.Group>
                        <Form.Group controlid='formBasicEmail'>
                            <Form.Row>
                                <Form.Label className='label'>
                                    Username
                                </Form.Label>
                                <Form.Control
                                    type='string'
                                    placeholder='Username'
                                    name='username'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </Form.Row>
                        </Form.Group>
                        <Form.Group controlid='formBasicEmail'>
                            <Form.Row>
                                <Form.Label className='label'>
                                    User Type
                                </Form.Label>
                                <Form.Control
                                    as='select'
                                    custom
                                    name='userType'
                                    value={this.state.userType}
                                    onChange={this.handleChange}
                                >
                                    <option>N/A</option>
                                    <option>Customer</option>
                                    <option>Service Provider</option>
                                </Form.Control>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group controlid='formBasicPassword'>
                            <Form.Row>
                                <Form.Label className='label'>
                                    Password
                                </Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row>
                                <Button
                                    className='submitBtn'
                                    variant='primary'
                                    type='submit'
                                >
                                    Register
                                </Button>
                            </Form.Row>
                        </Form.Group>
                    </Form>
                    <a href='/login'>Have an account already? Login</a>
                </Container>
            </div>
        );
    }
}

export default withRouter(Register);
