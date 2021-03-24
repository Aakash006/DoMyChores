import React, { Component } from 'react';
import NavBar from '../Navbar/Navbar';
import { Table, Button, Container } from 'react-bootstrap';
import './Requests.css';

export class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // dummy data 
            requests: [
                {
                    address: 'juhu',
                    requestDate: '2021-09-10'
                },
                {
                    address: '1050',
                    requestDate: '2021-05-10'
                }
            ]
        }
    }

    fetchRequests() {
        fetch(`/api/service-requests/`, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                this.setState({requests: data})
            }).catch((error) => {
                console.log("error: " + error);
            });
    }

    acceptRequest = (event) => {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        fetch(`/api/service-requests/tacker-accept`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'acceptedDate': date,
                'accepterId': localStorage.getItem('id')
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
                <Container>
                    <Table className="requestsTable">
                        {this.state.requests.length > 0 ?
                            <tbody>
                                {this.state.requests.map((request) =>
                                    <tr>
                                        <td>{request.address}</td>
                                        <td>{request.requestDate}</td>
                                        <td><Button onClick={this.acceptRequest}>Accept</Button></td>
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
