import './Register.css';
import React from 'react';
import { Form, Button } from 'react-bootstrap';

export class Register extends React.Component {

    register = () => {
      console.log("submitted");
    }

    render() {
        return (
        <div className="container">
            <Form onSubmit={this.login}>
                <Form.Row controlId="formBasicEmail">
                    <Form.Label className="label">Email</Form.Label>
                    <Form.Control type="email" placeholder="email" />
                </Form.Row>

                <Form.Row controlId="formBasicEmail">
                    <Form.Label className="label">Username</Form.Label>
                    <Form.Control type="string" placeholder="username" />
                </Form.Row>

                <Form.Row controlId="formBasicEmail">
                    <Form.Label className="label">User Type</Form.Label>
                    <Form.Control as="select" custom>
                      <option>Customer</option>
                      <option>Service Provider</option>
                    </Form.Control>
                </Form.Row>

                <Form.Row controlId="formBasicPassword">
                    <Form.Label className="label">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Row>

                <Form.Row>
                    <Button className="submitBtn" variant="primary" type="submit">Register</Button>
                </Form.Row>
            </Form>
        </div>)
    }
}

export default Register;
