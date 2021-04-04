import React, { Component } from 'react';
import './Review.css';
import { Form, Button, Container, Col } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';

export default class Review extends Component {
    constructor(props) {
        if (localStorage.getItem("id") === null) {
            window.location.replace(`${window.location.protocol + '//' + window.location.host}/login`);
        }
        super(props);
        this.state = {
            ratings: "0",
            picture: "",
            from: this.props.match.params.requester,
            to: this.props.match.params.provider
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
                    'fromUsername': this.state.from,
                    'toUsername': this.state.to,
                    'ratings': this.state.ratings,
                    'picturesLinks': 'dummy' //this.state.picture
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        toast.success('Review Posted');
                    } else {
                        toast.error('Review Could Not Be Posted');
                        console.log('Error ' + data.msg);
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
                    <Form.Row className="formRow">
                        <Col>
                            <Form.Label className="label">From</Form.Label>
                            <Form.Control size="sm" value={this.state.from} readOnly/>
                        </Col>

                        <Col>
                            <Form.Label className="label">To</Form.Label>
                            <Form.Control size="sm" value={this.state.to} readOnly/>
                        </Col>
                    </Form.Row>

                    <Form.Row className="formRow">
                        <Form.Label className="label">Rating</Form.Label>
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
                            <Form.Control size="sm" value={this.state.ratings} readOnly/>
                        </Col>
                    </Form.Row>

                    <Form.Row className="formRow">
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
