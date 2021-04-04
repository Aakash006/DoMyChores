import "./Navbar.css";
import React from 'react';
import { Nav, Navbar, NavDropdown, Modal, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,

        }
    }
    handleClick = () => {
        this.setState({ show: !this.state.show })
    }

    handleClose = () => {
        this.setState({ show: !this.state.show });
        localStorage.clear();
        window.location.replace(`${window.location.protocol + '//' + window.location.host}/login`);
    }

    render() {
        return (
            <>

                <Navbar expand='lg' bg='dark' variant='dark'>
                    <Navbar.Brand className='navTitle' href='/' exact="true">DoMyChores</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='mr-auto'>
                            <Nav.Link className='navLink' href='/' exact='true'>Dashboard</Nav.Link>
                            <Nav.Link className='navLink' href='/history' exact="true">History</Nav.Link>
                        </Nav>
                        <Nav className='nav-item ml-auto'>
                            <NavDropdown title={localStorage.getItem('username')} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={this.handleClick}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClick}
                    backdrop="static"
                    keyboard={false}
                    animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Logout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to logout?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>Yes</Button>
                        <Button variant="secondary" onClick={this.handleClick}>No</Button>
                    </Modal.Footer>
                </Modal>
            </>

        );
    }
}
export default withRouter(NavBar);
