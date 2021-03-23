import React, { Component } from 'react';
import './Dashboard.css';
import { withRouter } from "react-router-dom";
import NavBar from '../Navbar/Navbar';
import { Button, Row, Col, Card, Container, Badge } from "react-bootstrap";

export class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userType: localStorage.getItem('userType'),
            //dummy tasks
            services: [ 
                {task: 'Snow Removal', requests:'1'}, 
                {task: 'Grass Removal', requests: '2'}, 
                {task: 'Garbage Disposal', requests: '0'}
            ],
        };
    }

    handleClick = () => {
        // Make Task
        this.props.history.push("/request/shovel");
    }

    render() {
        return (
            <div>
                <NavBar />
                <Container className="cards">
                {this.state.services.length > 0 ? (<Row>
                            {this.state.services.map((service) => 
                            <Col>
                                <Card className="serviceCard" style={{ width: '18rem' }} bg="dark" text="white">
                                    <Card.Body>
                                        <Card.Title className="taskName">{service.task} <Badge variant="success">{service.requests}</Badge></Card.Title>
                                        <Row>
                                        {
                                            this.state.userType === 'Customer' && 
                                            <Button className="createBtn" onClick={this.handleClick}>Create a Task</Button>
                                        }
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>)}
                        </Row>): 
                    ''}
                </Container>
            </div>
        );
    }
}

export default withRouter(Dashboard);
