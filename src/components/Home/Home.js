import React from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Tab, Tabs, Container } from "react-bootstrap";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Container>
                    <Tabs
                        defaultActiveKey="login"
                        id="uncontrolled-tab-example"
                    >
                        <Tab eventKey="login" title="Login">
                            <Login />
                        </Tab>
                        <Tab eventKey="register" title="Register">
                            <Register />
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }
}
