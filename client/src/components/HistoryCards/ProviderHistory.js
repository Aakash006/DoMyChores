import React, { Component } from 'react';
import { Button, Badge, Row, Col, Card, Container } from 'react-bootstrap';
import './HistoryCards.css';

export default class ProviderHistory extends Component {

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
                    <Container>
                            {this.props.requests.map((request)=> {
                                return <Row>
                                <Col>
                                {request.status === 'ACCEPTED' ? 
                                    <Card className="serviceCard" style={{flex: 1}} bg="dark" text="white">
                                        <Card.Body>
                                            <Card.Title className="taskName"><b>{request.requestedFor}</b></Card.Title>
                                            <Card.Text className="text"><b>Requested By: </b>{request.requesterUserName}</Card.Text>
                                            <Card.Text className="text"><b>Tasks: </b>{request.requestedTasks.map((task, index) => {
                                                return task + (index === request.requestedTasks.length - 1 ? '' : ', ') })}
                                            </Card.Text>
                                            <Card.Text className="text"><b>Address: </b>{request.address}</Card.Text>
                                            <Card.Text className="text"><Badge variant={this.getStatusStyle(request.status)}>{request.status}</Badge></Card.Text>
                                            <Row>
                                            {
                                                request.status === 'ACCEPTED' ? <Button className="completeBtn" onClick={(e) => this.completeRequest(request.id, e)}>Complete</Button> : ''
                                            }
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                 : ('')}
                                </Col>
                                <Col>
                                    {request.status === 'DONE' ?
                                    <Card className="serviceCard" style={{flex: 1}} bg="dark" text="white">
                                        <Card.Body>
                                            <Card.Title className="taskName"><b>{request.requestedFor}</b></Card.Title>
                                            <Card.Text className="text"><b>Requested By: </b>{request.requesterUserName}</Card.Text>
                                            <Card.Text className="text"><b>Tasks: </b>{request.requestedTasks.map((task, index) => {
                                                return task + (index === request.requestedTasks.length - 1 ? '' : ', ') })}
                                            </Card.Text>
                                            <Card.Text className="text"><b>Address: </b>{request.address}</Card.Text>
                                            <Card.Text className="text"><Badge variant={this.getStatusStyle(request.status)}>{request.status}</Badge></Card.Text>
                                            {request.completedTimeStamp ? <Card.Text className="text"><b>Completed At: </b>{request.completedTimeStamp}</Card.Text> : ('')}
                                        </Card.Body>
                                    </Card>: ('')}
                                </Col>
                                 </Row>})}
                        </Container>}
            </div>
        )
    }
}
