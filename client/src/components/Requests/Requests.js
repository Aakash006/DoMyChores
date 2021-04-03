import React, { Component } from 'react';
import { Table, Button, Container, Badge } from 'react-bootstrap';
import './Requests.css';
import { ToastContainer, toast } from 'react-toastify';

export class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: []
        }

        this.fetchRequests();
    }

    fetchRequests() {
        fetch(`/api/service-requests/`, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                const requested = data.filter((request) => request.status.includes("REQUESTED"));
                this.setState({requests: requested});
            }).catch((error) => {
                console.log("error: " + error);
            });
    }

    acceptRequest = (id, e) => {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
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
            }).catch((error) =>{
                console.log('error: ' + error);
            });
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <Container>
                    <Table className="requestsTable">
                        {this.state.requests.length > 0 ?
                            <tbody>
                                {this.state.requests.map((request) =>
                                    <tr>
                                        <td><b>Requested by: </b>{request.requesterUserName}</td>
                                        <td>{request.requestedTasks.map((task, index) => {
                                            return task + (index === request.requestedTasks.length - 1 ? ('') : (', '));
                                        })}</td>
                                        {/* {request.address ? <td><b>Address: </b>{request.address}</td> : ('')} */}
                                        {/* {request.requestedFor ? <td><b>Requested For : </b>{request.requestedFor}</td> : ('')} */}
                                        {request.taskerUserName ? <td><b>Accepted by: </b>{request.taskerUserName}</td> : ('')}
                                        <td><Badge variant="success">{request.status}</Badge></td>
                                        {request.status === 'REQUESTED' ? 
                                        <td><Button onClick={(e) => this.acceptRequest(request.id, e)}>Accept</Button></td> : ''}
                                    </tr>
                                )}
                            </tbody>
                            : (<h3>No requests</h3>)}
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Requests;
