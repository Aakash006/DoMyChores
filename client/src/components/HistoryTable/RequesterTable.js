import React, { Component } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import './HistoryTable.css';

export default class RequesterTable extends Component {

    review = (requester, provider, event) => {
        window.location.replace(`${window.location.protocol + '//' + window.location.host}/review/${requester}/${provider}`);
    }

    getStatusStyle(status) {
        if (status === 'REQUESTED') {
            return 'warning';
        } else if (status === 'ACCEPTED') {
            return 'primary';
        } else {
            return 'success';
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.requests.length === 0 ?
                        <h3>No requests</h3> :
                        <Table className="historyTable" striped bordered hover>
                            <thead>
                                <tr>
                                    <td>
                                        <b>Requested For</b>
                                    </td>
                                    <td>
                                        <b>Tasks</b>
                                    </td>
                                    <td>
                                        <b>Address</b>
                                    </td>
                                    <td>
                                        <b>Status</b>
                                    </td>
                                    <td>
                                        <b>Accepted By</b>
                                    </td>
                                    <td>
                                        <b>Action</b>
                                    </td>
                                    <td>
                                        <b>Completed At</b>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.requests.map((request) =>
                                    <tr key={request.id}>
                                        <td>{request.requestedFor}</td>
                                        <td>{request.requestedTasks.map((task, index) => {
                                            return task + (index === request.requestedTasks.length - 1 ? '' : ', ');
                                        })}</td>
                                        <td>{request.address ? request.address : ''}</td>
                                        <td><Badge variant={this.getStatusStyle(request.status)}>{request.status}</Badge></td>
                                        <td>{request.taskerUserName ? request.taskerUserName : 'N/A'}</td>
                                        <td>{request.status === 'DONE' ? <Button onClick={(e) => this.review(request.requesterUserName, request.taskerUserName, e)}>Review</Button> : ''}</td>
                                        <td>{request.completedTimeStamp ? request.completedTimeStamp : ''}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                }
            </div>
        )
    }
}
