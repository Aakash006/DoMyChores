import React, { Component } from 'react';
import { Button, Badge, Row, Col, Card } from 'react-bootstrap';
import './HistoryCards.css';
import Review from '../ReviewRequest/Review';

export default class RequesterHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            requester: '',
            provider: '',
        }
    }

    review = (requester, provider, event) => {
        // window.location.replace(`${window.location.protocol + '//' + window.location.host}/review/${requester}/${provider}`);
        this.setState({ openModal: true, requester: requester, provider: provider})
    }

    closeModal = () => {
        this.setState({openModal: false})
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
            <>
                {
                    this.props.requests.length === 0 ?
                        <h3>No requests</h3> :
                        <Row>
                            {this.props.requests.map((request, id)=> 
                            <Col key={id} md={4}>
                                <Card key={id} className="serviceCard" style={{flex: 1}} bg="dark" text="white">
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
                {
                    this.state.openModal && <Review requester={this.state.requester} provider={this.state.provider} modalCloser={this.closeModal}/>
                }
            </>
        )
    }
}
