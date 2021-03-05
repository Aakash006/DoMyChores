import './Login.css';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Home from '../Home/Home';
import { withRouter } from 'react-router-dom';

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    login = (event) => {
        event.preventDefault();
        this.props.history.push('/dashboard');
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.login}>
                    <Form.Row controlId='formBasicEmail'>
                        <Form.Label className='label'>Username</Form.Label>
                        <Form.Control
                            type='string'
                            placeholder='username'
                            name='username'
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </Form.Row>

                    <Form.Row controlId='formBasicPassword'>
                        <Form.Label className='label'>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </Form.Row>
                    <Form.Row>
                        <Button
                            className='submitBtn'
                            variant='primary'
                            type='submit'
                        >
                            Login
                        </Button>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

export default withRouter(Login);
