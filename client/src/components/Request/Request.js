import { React, Component } from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap';
import { NavBar } from '../Navbar/Navbar';
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
        const taskName = this.props.match.params.task;
        let tempTask = services.find(wholeTask => wholeTask.task === taskName);
        tempTask = tempTask.subTasks.length > 0 ? tempTask.subTasks : [tempTask.task];
        this.state = {
            address: "",
            requestDate: "",
            extraNotes: "",
            tasks: tempTask
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
                'price' : '70.00'
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
            }).catch((error) =>{
                console.log('error: ' + error);
            });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <NavBar />
                <ToastContainer/>
                <div className="request">
                    <h2>Request for: {this.props.match.params.task}</h2>
                    <Container>
                        <Form onSubmit={this.submitRequest}>
                            <Form.Row>
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="address" name="address" value={this.state.address} onChange={this.handleChange} />
                            </Form.Row>
                            <Form.Row>
                                <Form.Label>Date for task</Form.Label>
                                <Form.Control type="date" placeholder="Date" name="requestDate" value={this.state.requestDate} onChange={this.handleChange} />
                            </Form.Row>
                            <Form.Row>
                                <Form.Label>Notes</Form.Label>
                                <Form.Control name="extraNotes" value={this.state.extraNotes} onChange={this.handleChange} />
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Button variant="primary" type="submit" >Submit</Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }
}

export default withRouter(Request);