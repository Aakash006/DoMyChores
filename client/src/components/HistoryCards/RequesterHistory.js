import React, { Component } from 'react';
import { Button, Badge, Row, Col, Card } from 'react-bootstrap';
import './HistoryCards.css';

export default class RequesterHistory extends Component {

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
                        <Row>
                            {this.props.requests.map((request)=> 
                            <Col md={4}>
                                <Card className="serviceCard" style={{flex: 1}} bg="dark" text="white">
                                    <Card.Body>
                                        <Card.Title className="taskName"><b>{request.requestedFor}</b></Card.Title>
                                        <Card.Text className="text"><b>Tasks: </b>{request.requestedTasks.map((task, index) => {
                                            return task + (index === request.requestedTasks.length - 1 ? '' : ', ') })}
                                        </Card.Text>
                                        <Card.Text className="text"><b>Address: </b>{request.address}</Card.Text>
                                        <Card.Text className="text"><Badge variant={this.getStatusStyle(request.status)}>{request.status}</Badge></Card.Text>
                                        {request.taskerUserName ? <Card.Text className="text"><b>Accepted By: </b>{request.taskerUserName}</Card.Text> : ('')}
                                        {request.completedTimeStamp ? <Card.Text className="text"><b>Completed At: </b>{request.completedTimeStamp}</Card.Text> : ('')}
                                        <Row>
                                        {
                                            request.status === 'DONE' ? <Button className="reviewBtn" onClick={(e) => this.review(request.requesterUserName, request.taskerUserName, e)}>Review</Button> : ''
                                        }
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>)}
                        </Row>
                }
            </div>
        )
    }
}
