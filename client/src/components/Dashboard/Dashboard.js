import React, { Component } from 'react';
import './Dashboard.css';
import { withRouter } from "react-router-dom";
import NavBar from '../Navbar/Navbar';
import { Button, Row, Col, Card, Container } from "react-bootstrap";
import { Request } from '../Request/Request';
import { Requests } from '../Requests/Requests';
import services from '../../assets/service.json';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export class Dashboard extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem("id") === null) {
            window.location.replace(`${window.location.protocol + '//' + window.location.host}/login`);
        }
        this.state = {
            userType: localStorage.getItem('userType'),
            openModal: false,
            selectedTask: null
        };
    }

    handleClick = (e, task) => {
        // Make Task
        // window.location.replace(`${window.location.protocol + '//' + window.location.host}/request/${task}`);
        this.setState({ openModal: true, selectedTask: task })
    }

    closeModal = () => {
        this.setState({ openModal: false })
    }

    render() {
        return (
            <>
                <NavBar />
                {localStorage.getItem('userType') === 'Customer' ?
                    <div style={{ padding: '20px', textAlign: 'initial' }}>
                        <h1 style={{ borderBottom: '1px solid rgb(199, 205, 209)' }}>Individual Services</h1>
                        <Container className="cards">
                            {
                                services.length > 0 &&
                                <Row>
                                    {
                                        services.map((service, id) =>
                                            !service.task.includes('Package') && <Col key={id} md={4}>
                                                <Card className="serviceCard" style={{ flex: 1 }} bg="dark" text="white">
                                                    <Card.Body>
                                                        <Card.Title>{service.task}</Card.Title>
                                                        <Card.Text>{service.description}</Card.Text>
                                                        <Card.Text>Budget: ${service.price}</Card.Text>
                                                        <Card.Text>{
                                                            service.subTasks.length > 0 &&
                                                            service.subTasks.map((task, index) =>
                                                                <span key={index}>{task}{service.subTasks.length - 1 === index ? ('') : (', ')}</span>
                                                            )
                                                        }
                                                        </Card.Text>
                                                        <Row>
                                                            {
                                                                this.state.userType === 'Customer' &&
                                                                <Button className="createBtn" onClick={(e) => this.handleClick(e, service.task)}>Create a Task</Button>
                                                            }
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>
                            }
                        </Container>

                        <h1 style={{ borderBottom: '1px solid rgb(199, 205, 209)' }}>Packages</h1>
                        <Container className="cards">
                            {
                                services.length > 0 &&
                                <Row>
                                    {
                                        services.map((service, id) =>
                                            service.task.includes('Package') && <Col key={id} md={4}>
                                                <Card className="serviceCard" style={{ flex: 1 }} bg="dark" text="white">
                                                    <Card.Body>
                                                        <Card.Title>{service.task}</Card.Title>
                                                        <Card.Text>{service.description}</Card.Text>
                                                        <Card.Text>Budget: ${service.price}</Card.Text>
                                                        <Card.Text>{
                                                            service.subTasks.length > 0 &&
                                                            service.subTasks.map((task, index) =>
                                                                <span key={index}>{task}{service.subTasks.length - 1 === index ? ('') : (', ')}</span>
                                                            )
                                                        }
                                                        </Card.Text>
                                                        <Row>
                                                            {
                                                                this.state.userType === 'Customer' &&
                                                                <Button className="createBtn" onClick={(e) => this.handleClick(e, service.task)}>Create a Task</Button>
                                                            }
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>
                            }
                        </Container>

                    </div>
                    : (<Requests />)}
                {
                    this.state.openModal && <Request task={this.state.selectedTask} modalCloser={this.closeModal} />
                }
                <ToastContainer />
            </>
        );
    }
}

export default withRouter(Dashboard);
