import { React, Component } from 'react';
import { NavBar } from '../Navbar/Navbar';

export class History extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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