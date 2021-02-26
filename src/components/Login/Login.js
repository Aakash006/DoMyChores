import './Login.css';
import React from 'react';
import { Form, Button } from 'react-bootstrap';

export class Login extends React.Component {

    login = () => {
      console.log("submitted");
    }

    render() {
        return (
        <div className="container">
            <Form onSubmit={this.login}>
                <Form.Row controlId="formBasicEmail">
                  <Form.Label className="label">Username</Form.Label>
                  <Form.Control type="string" placeholder="username" />
                </Form.Row>

                <Form.Row controlId="formBasicPassword">
                  <Form.Label className="label">Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Row>
                <Form.Row>
                    <Button className="submitBtn" variant="primary" type="submit">Login</Button>
                </Form.Row>
            </Form>
        </div>)
    }
}

export default Login;
