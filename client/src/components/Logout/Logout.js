import React, { Component } from 'react'
import { withRouter } from "react-router";
import NavBar from '../Navbar/Navbar'
import { Button } from 'react-bootstrap';

export class Logout extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.clear();
        this.props.history.push("/login");
    }

    render() {
        return (
            <div>
                <NavBar/>
                <h2>
                    Are you sure you would like to log out?
                </h2>
                <Button onClick={this.logout}>
                    Yes
                </Button>
                <Button href="/dashboard">
                    No
                </Button>
                
            </div>
        )
    }
}

export default withRouter(Logout);
