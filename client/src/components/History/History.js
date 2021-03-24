import { React, Component } from 'react';
import { NavBar } from '../Navbar/Navbar';

export class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: []
        };
    }

    fetchRecents() {
        fetch(`/api/service-requests/get-user`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({requests: data});
            });
    }

    render() {
        return (
            <div>
                <NavBar />
                <p>History</p>
            </div>
        );
    }
}

export default History;