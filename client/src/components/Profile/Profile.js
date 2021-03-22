import React from "react";
import { withRouter } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";

import NavBar from "../Navbar/Navbar";

export class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            userType: localStorage.getItem('userType'),
            id: localStorage.getItem('id'),
            reviewList: []
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    
    render() {
        return (
            <div>
                <NavBar />
                <Jumbotron>
                    <h1>{this.state.username}</h1>
                    <p>Email: {this.state.email}</p>
                </Jumbotron>
            </div>
        );
    }
}

export default withRouter(Profile);
