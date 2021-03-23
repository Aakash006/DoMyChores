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
    render() {
        return (
            <div>
                <NavBar />
                <h2>Requests for {/* {this.props.match.params.task} */}</h2>
                <Container>
                    <Table className="requestsTable">
                        {this.state.requests.length > 0 ?
                            <tbody>
                                {this.state.requests.map((request) =>
                                    <tr>
                                        <td>{request.address}</td>
                                        <td>{request.requestDate}</td>
                                        <td><Button>Accept</Button></td>
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
