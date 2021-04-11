import React, { Component } from 'react';
import './Review.css';
import { Form, Button, Figure, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";

/* Class to render review modal */
export default class Review extends Component {
    /* class constructor to initialize the props and states */
    constructor(props) {
        if (localStorage.getItem('id') === null) {
            window.location.replace(
                `${
                    window.location.protocol + '//' + window.location.host
                }/login`
            );
        }
        super(props);
        this.state = {
            ratings: 0,
            picture: 'Choose file input',
            pictureLinks: [],
            from: this.props.requester,
            to: this.props.provider,
            show: true,
            comment: '',
        };
    }

    /* Handle review change */
    handleChange = (rating) => {
        this.setState({ ratings: rating });
    };

    /* Submit a picture and save it on the server */
    submitPicture = (event) => {
        event.preventDefault();
        this.setState({
            picture: event.target.files[0].name,
        });

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e) => {
            fetch(`/api/image-upload`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: e.target.result.replace(/data:image\/\w+;/, ''),
                    mime: e.target.result.split(';')[0].replace(/data:/, ''),
                    name: event.target.files[0].name,
                }),
            })
                .then((res) => res.json())
                .then((dat) => {
                    this.setState((state) => ({
                        pictureLinks: [...state.pictureLinks, dat.url],
                    }));
                });
        };
    };

    /* Add a review to the user and update to the server */
    review = (event) => {
        event.preventDefault();
        fetch(`/api/review/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fromUsername: this.state.from,
                toUsername: this.state.to,
                ratings: this.state.ratings,
                pictureLinks: this.state.pictureLinks,
                comment: this.state.comment,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success('Review Posted');
                } else {
                    toast.error('Review Could Not Be Posted');
                    console.log('Error ' + data.msg);
                }
                this.handleClose();
            });
    };

    /* Handle modal close change */
    handleClose = () => {
        this.setState({ show: false });
        this.props.modalCloser();
    };

    /* Handle comment change */
    handleCommentChange = (e) => {
        this.setState({ comment: e.target.value });
    };

    /* Render the component */
    render() {
        return (
            <Modal
                show={this.state.show}
                onHide={this.handleClose}
                animation={false}
            >
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Post Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.review}>
                        <Form.Group>
                            <Form.Row className='formRow'>
                                <Form.Label className='label'>
                                    Service Worker
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    value={this.state.to}
                                    readOnly
                                />
                            </Form.Row>
                        </Form.Group>

                        <Form.Group>
                            <Form.Row className='formRow'>
                                <Form.Label className='label'>
                                    Comments
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    value={this.state.comment}
                                    onChange={this.handleCommentChange}
                                />
                            </Form.Row>
                        </Form.Group>

                        <Form.Label className='label'>Rating</Form.Label>
                        <div
                            style={{ marginTop: '-15px', marginBottom: '10px' }}
                        >
                            <ReactStars
                                count={5}
                                onChange={this.handleChange}
                                size={35}
                                activeColor='#ffd700'
                            />
                        </div>

                        <Form.Row className='formRow'>
                            <Form.Label className='label'>Picture</Form.Label>
                            <Form.File
                                id='custom-file-translate-scss'
                                label={this.state.picture}
                                onChange={this.submitPicture}
                                custom
                                lang='en'
                            />
                        </Form.Row>
                        {this.state.pictureLinks.length !== 0 && (
                            <Form.Row className='formRow'>
                                {this.state.pictureLinks.map((pic, id) => {
                                    return (
                                        <Figure key={id}>
                                            <Figure.Image
                                                width={171}
                                                height={180}
                                                alt='171x180'
                                                src={pic}
                                            />
                                        </Figure>
                                    );
                                })}
                            </Form.Row>
                        )}
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}
