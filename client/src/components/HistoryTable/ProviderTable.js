import React, { Component } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import './HistoryTable.css';

export default class ProviderTable extends Component {

    getStatusStyle(status) {
        if (status === 'REQUESTED') {
            return 'warning';
        } else if (status === 'ACCEPTED') {
            return 'primary';
        } else {
            return 'success';
        }
    }

    completeRequest = (id, e) => {
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
                    window.location.reload(false);
                } else {
                    console.log('Error: ' + data.message);
                }
            }).catch((error) => {
                console.log('error: ' + error);
            });
    }

    render() {
        return (
            <div>
                {
                    this.props.requests['msg'] === 'No transactions found.' ? <h3>No history</h3> :
                        <Table className="historyTable">
                            <thead>
                                <tr>
                                    <td>
                                        <b>Requested By</b>
                                    </td>
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
                                        <td>{request.requesterUserName}</td>
                                        <td>{request.requestedFor}</td>
                                        <td>{request.requestedTasks.map((task, index) => {
                                            return task + (index === request.requestedTasks.length - 1 ? '' : ', ');
                                        })}</td>
                                        <td>{<span>{request.address ? request.address : ''}</span>}</td>
                                        <td><Badge variant={this.getStatusStyle(request.status)}>{request.status}</Badge></td>
                                        <td>{request.status === 'ACCEPTED' ? <Button onClick={(e) => this.completeRequest(request.id, e)}>Complete</Button> : ''}</td>
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
