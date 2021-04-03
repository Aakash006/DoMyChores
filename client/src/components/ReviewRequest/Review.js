import React, { Component } from 'react';
import './Review.css';
import { Form, Button, Container, Col } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';

export default class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ratings: "0",
            picture: ""
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    submitPicture = (event) => {
        this.setState({
            picture: event.value,
        });
    }

    review = (event) => {
        event.preventDefault();
            fetch(`/api/review/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'fromUsername': 'dummy',
                    'toUsernamesword': 'dummy',
                    'ratings': this.state.ratings,
                    'picturesLinks': this.state.picture
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        toast.success('Review Posted');
                    } else {
                        toast.error('Review Could Not Be Posted');
                    }
                });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <ToastContainer/>
                <div className="reviewContent">
                <Container>
                <Form onSubmit={this.review}>
                    <Form.Row controlid="formBasicEmail">
                            <Form.Label className="label">Ratings</Form.Label>
                            <Col>
                            <Form.Control
                                type="range"
                                min="0"
                                max="5"
                                step="0.5"
                                placeholder="ratings"
                                name="ratings"
                                tooltip='on'
                                value={this.state.ratings}
                                onChange={(e) => this.handleChange(e)}
                            />
                            </Col>
                            <Col>
                                <Form.Control size="sm" value={this.state.ratings}/>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label className="label">Picture</Form.Label>
                            <Form.File size="sm" id="picture" onChange={this.submitPicture}/>
                        </Form.Row>

                        <Button type="submit">Submit</Button>
                </Form>
                </Container>
                </div>
            </div>
        )
    }
}
