import { React, Component } from 'react';
import { Form, Button, Col, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Request.css';
import services from '../../assets/service.json';

export class Request extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem("id") === null) {
            window.location.replace(`${window.location.protocol + '//' + window.location.host}/login`);
        }
        const taskName = this.props.task;
        let tempTask = services.find(wholeTask => wholeTask.task === taskName);
        let price = tempTask.price;
        tempTask = tempTask.subTasks.length > 0 ? tempTask.subTasks : [tempTask.task];
        this.state = {
            address: "",
            requestDate: "",
            extraNotes: "",
            tasks: tempTask,
            price: price,
            show: true
        }
    }

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
            }).catch((error) => {
                console.log('error: ' + error);
            });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleClose = () => {
        this.setState({ show: false })
        this.props.modalCloser()
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                <ToastContainer />
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
                                <Form.Label>Completion Date</Form.Label>
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
                                    <Button variant="primary" type="submit" style={{marginLeft: 'auto', marginRight: 'auto'}}>Submit</Button>
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