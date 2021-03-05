import React, { Component } from 'react';
import './Dashboard.css';
import NavBar from '../Navbar/Navbar';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            services: ['Snow Removal', 'Grass Removal', 'Garbage Disposal'],
        };
    }
    render() {
        return (
            <div>
                <NavBar />
                <h1 className='title'>Dashboard</h1>
                {this.state.services.map((service) => (
                    <h2>{service}</h2>
                ))}
                ;
            </div>
        );
    }
}
