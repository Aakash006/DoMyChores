import React, { Component } from 'react';
import './Dashboard.css';
import { withRouter } from "react-router-dom";
import NavBar from '../Navbar/Navbar';
import { Button, Row, Col, Card, Container } from "react-bootstrap";
import { Requests } from '../Requests/Requests';
import services from '../../assets/service.json';

export class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userType: localStorage.getItem('userType'),
            test: 1,
        };
    }

    fetchServices() {
        fetch(`/api/services`, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                this.setState({services: data});
            }).catch((error) => {
                console.log("error: " + error);
            });
    }

    handleClick = (e, task) => {
        // Make Task
        this.props.history.push(`/request/${task}`);
    }

    render() {
        return (
            <div>
                <NavBar />
                {this.state.test === 1 ? 
                <Container className="cards">
                {services.length > 0 ? (<Row>
                            {services.map((service) => 
                            <Col md={4}>
                                <Card className="serviceCard" style={{flex: 1}} bg="dark" text="white">
                                    <Card.Body>
                                        <Card.Title className="taskName"><b>{service.task}</b></Card.Title>
                                        <Card.Text>{service.subTasks.length > 0 ?
                                        (<p>{service.subTasks.map((task, index) => {
                                            return (<span>{task} {service.subTasks.length - 1 === index? ('') : (', ')}</span>)
                                        })}</p>) : ('') }
                                        </Card.Text>
                                        <Row>
                                        {
                                            this.state.userType === 'Customer' && 
                                            <Button className="createBtn" onClick={(e) => this.handleClick(e, service.task)}>Create a Task</Button>
                                        }
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>)}
                        </Row>): 
                    ''}
                </Container>
                : (<Requests/>) }
            </div>
        );
    }
}

export default withRouter(Dashboard);
