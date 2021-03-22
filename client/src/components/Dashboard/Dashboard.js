import React, { Component } from 'react';
import './Dashboard.css';
import NavBar from '../Navbar/Navbar';
import { Button } from "react-bootstrap";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userType: localStorage.getItem('userType'),
            services: ['Snow Removal', 'Grass Removal', 'Garbage Disposal'],
        };
    }

    handleClick = () => {
        // Make Task
    }

    render() {
        return (
            <>
                <NavBar />
                {
                    this.state.userType === 'Customer' && 
                    <Button onClick={this.handleClick}>Create a Task</Button>
                }
            </>
        );
    }
}
