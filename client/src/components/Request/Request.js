import { React, Component } from 'react';
import { Form, Button, Col, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Request.css';
import services from '../../assets/service.json';

/* Class to render request page */
export class Request extends Component {
    /* class constructor to initialize the props and states */
    constructor(props) {
        super(props);
        if (localStorage.getItem("id") === null) {
            window.location.replace(`${window.location.protocol + '//' + window.location.host}/login`);
        }
        const taskName = this.props.task;
        let tempTask = services.find(wholeTask => wholeTask.task === taskName);
        const price = tempTask.price;
        tempTask = tempTask.subTasks.length > 0 ? tempTask.subTasks : [tempTask.task];
        this.state = {
            address: "",
            requestDate: "",
            extraNotes: "",
            tasks: tempTask,
            price: price,
            show: true
        }

        this.dPrice = price
    }

    /* submit a request to the server */
    submitRequest = (event) => {
        event.preventDefault();
        fetch(`/api/service-requests/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'address': this.state.address,
                'requestDate': this.state.requestDate,
                'requesterUserName': localStorage.getItem('username'),
                'extraNotes': this.state.extraNotes,
                'requestedTasks': this.state.tasks,
                'price': this.state.price
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.success) {
                    console.log('Success!');
                    toast.success('Request Submitted');
                } else {
                    console.log('Error: ' + data.message);
                    toast.error('Request Could not be Submitted');
                }
                this.handleClose();
            }).catch((error) => {
                console.log('error: ' + error);
            });
    }

    /* Return the price value based on date */
    calcPriceToDate = (dateVal) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const dateDiff = Math.round( Math.abs((new Date(dateVal) - new Date())/oneDay) );
        let price = this.dPrice;

        return (dateDiff <= 7) ? price += price * ( (8 - dateDiff) * 0.1 ) : price;
    };

    /* Handle input change */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });

        if(event.target.name === 'requestDate'){
            this.setState({
                price: this.calcPriceToDate(event.target.value),
            });
        }
    };

    /* Handle modal close change */
    handleClose = () => {
        this.setState({ show: false })
        this.props.modalCloser()
    }

    /* Render the component */
    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.task}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.submitRequest}>
                        <Form.Group>
                            <Form.Row>
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="Address" name="address" value={this.state.address} onChange={this.handleChange} />
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row>
                                <Form.Label>Required Completion Date:</Form.Label>
                                <Form.Control type="date" placeholder="Date" name="requestDate" value={this.state.requestDate} onChange={this.handleChange} />
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row>
                                <Form.Label>Notes</Form.Label>
                                <Form.Control placeholder="Work Hard" name="extraNotes" value={this.state.extraNotes} onChange={this.handleChange} />
                            </Form.Row>
                        </Form.Group>

                        <Form.Group>
                            <Form.Row>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" value={this.state.price} readOnly />
                            </Form.Row>
                        </Form.Group>

                        <Form.Group>
                            <Form.Row>
                                <Col>
                                    <Button variant="primary" type="submit" style={{ marginLeft: 'auto', marginRight: 'auto' }}>Submit</Button>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default withRouter(Request);