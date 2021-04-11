import React, { Component } from 'react';
import { Button, Container, Badge, Row, Card, Col } from 'react-bootstrap';
import './Requests.css';
import { ToastContainer, toast } from 'react-toastify';

/* Class to render requests page */
export class Requests extends Component {
    /* class constructor to initialize the props and states */
    constructor(props) {
        if (localStorage.getItem("id") === null) {
            window.location.replace(`${window.location.protocol + '//' + window.location.host}/login`);
        }
        super(props);
        this.state = {
            requests: []
        }

    }

    /* This will run methods immediately after a component is mounted */
    componentDidMount() {
        this.fetchRequests();
    }

    /* Fetch service request from the server */
    fetchRequests() {
        fetch(`/api/service-requests/`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                const requested = data.filter((request) => request.status.includes("REQUESTED"));
                this.setState({ requests: requested });
            }).catch((error) => {
                console.log("error: " + error);
            });
    }

    /* accept a service request and update to the server */
    acceptRequest = (id, e) => {
        fetch(`/api/service-requests/tasker-accept`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'id': id,
                'taskerUserName': localStorage.getItem('username')
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.success) {
                    console.log('Success!');
                    window.location.reload(false);
                    toast.success('Request Accepted');
                } else {
                    console.log('Error: ' + data.message);
                    toast.error('Request Could Not Be Accepeted');
                }
            }).catch((error) => {
                console.log('error: ' + error);
            });
    }

    /* Render the component */
    render() {
        return (
            <Container className="cards">
                <div style={{ padding: '20px', textAlign: 'initial' }}>
                    <h1 style={{ borderBottom: '1px solid rgb(199, 205, 209)' }}>Recent Jobs: </h1>
                    <Container className="cards">

                        {
                            this.state.requests.length === 0 ? <h3>No requests</h3> :
                                <Row>
                                    {
                                        this.state.requests.map((request, id) =>
                                            <Col key={id} md={4}>
                                                <Card className="serviceCard" style={{ flex: 1 }} bg="dark" text="white">
                                                    <Card.Body>
                                                        <Card.Title>Requester: {request.requesterUserName}</Card.Title>
                                                        <Card.Text><b>Task: </b>
                                                            {
                                                                request.requestedTasks.map((task, index) => task + (index === request.requestedTasks.length - 1 ? ('') : (', ')))
                                                            }
                                                        </Card.Text>
                                                        <Card.Text><b>Address:</b> {request.address}</Card.Text>
                                                        <Card.Text><b>Required Completion Date:</b> {request.requestedFor}</Card.Text>
                                                        <Card.Text className="text"><Badge variant="info">{request.status}</Badge></Card.Text>
                                                        <Row>
                                                            {
                                                                request.status === 'REQUESTED' ? <Button onClick={(e) => this.acceptRequest(request.id, e)} variant="info" style={{ marginLeft: 'auto', marginRight: 'auto' }}>Accept</Button> : ''
                                                            }
                                                        </Row>

                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>

                            // < Table className="requestsTable">
                            //     <thead>
                            //         <tr>
                            //             <td><b>Requested By</b></td>
                            //             <td><b>Tasks</b></td>
                            //             <td><b>Address</b></td>
                            //             <td><b>Requested For</b></td>
                            //             <td><b>Status</b></td>
                            //             <td><b>Action</b></td>
                            //         </tr>
                            //     </thead>
                            //     <tbody>
                            //         {this.state.requests.map((request, id) =>
                            //             <tr key={id}>
                            //                 <td>{request.requesterUserName}</td>
                            //                 <td>{request.requestedTasks.map((task, index) => {
                            //                     return task + (index === request.requestedTasks.length - 1 ? ('') : (', '));
                            //                 })}</td>
                            //                 <td>{request.address}</td>
                            //                 <td>{request.requestedFor}</td>
                            //                 <td><Badge variant="success">{request.status}</Badge></td>
                            //                 {request.status === 'REQUESTED' ?
                            //                     <td><Button onClick={(e) => this.acceptRequest(request.id, e)}>Accept</Button></td> : ''}
                            //             </tr>
                            //         )}
                            //     </tbody>
                            // </Table>
                        }
                    </Container>
                </div>
                <ToastContainer />
            </Container>
        );
    }
}

export default Requests;
