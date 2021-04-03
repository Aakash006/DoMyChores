import React, { Component } from 'react';
import './Dashboard.css';
import { withRouter } from "react-router-dom";
import NavBar from '../Navbar/Navbar';
import { Button, Row, Col, Card, Container } from "react-bootstrap";
import { Requests } from '../Requests/Requests';
import services from '../../assets/service.json';
import 'react-toastify/dist/ReactToastify.css';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem("id") === null) {
            window.location.replace(`${window.location.protocol + '//' + window.location.host}/login`);
        }
        this.state = {
            userType: localStorage.getItem('userType')
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
        window.location.replace(`${window.location.protocol + '//' + window.location.host}/request/${task}`);
    }

    render() {
        return (
            <div>
                <NavBar />
                {localStorage.getItem('userType') === 'Customer' ? 
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
