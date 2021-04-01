import { React, Component } from 'react';
import { Container, Table, Badge, Button } from 'react-bootstrap';
import { NavBar } from '../Navbar/Navbar';

export class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: []
        };

        this.fetchRecents();
    }

    fetchRecents() {
        fetch(`/api/service-requests/get-user?requesterUserName=${localStorage.getItem('username')}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({requests: data});
            });
    }

    completeRequest = (id, e) => {
        console.log(id);
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        fetch(`/api/service-requests/tasker-complete`, {
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
                } else {
                    console.log('Error: ' + data.message);
                }
            }).catch((error) =>{
                console.log('error: ' + error);
            });
    }

    render() {
        return (
            <div>
                <NavBar />
                <div>
                <Container>
                    <Table className="requestsTable">
                        {this.state.requests.length > 0 ?
                            <tbody>
                                {this.state.requests.map((request) =>
                                    <tr>
                                        {localStorage.getItem('userType') === 'Service Provider' ? <td><b>Requested by: </b>{request.requesterUserName}</td> : ('')}
                                        {request.requestedDate ? <td><b>Requested For : </b>{request.requestedFor}</td> : ('')}
                                        <td>{request.requestedTasks.map((task, index) => {
                                            return task + (index === request.requestedTasks.length - 1 ? ('') : (', '));
                                        })}</td>
                                        <td><Badge variant="success">{request.status}</Badge></td>
                                        {localStorage.getItem('userType') === 'Service Provider' && request.status === 'ACCEPTED' ? <td><Button onClick={(e) => this.completeRequest(request.id, e)}>Complete</Button></td> : ('')}
                                        {request.completedTimeStamp ? <td><b>Completed At : </b>{request.completedTimeStamp}</td> : ('')}
                                    </tr>
                                )}
                            </tbody>
                            : (<h3>No requests</h3>)}
                    </Table>
                </Container>
            </div>
            </div>
        );
    }
}

export default History;