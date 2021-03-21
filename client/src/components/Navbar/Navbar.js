import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './Navbar.css';

function NavBar(props) {
    return (
        <div className="header">
            <Navbar
                className='sticky-top'
                collapseOnSelect
                expand='lg'
                bg='light'
                sticky='top'
            >
                <Navbar.Brand className='navTitle' href='/' exact="true">
                    DoMyChores
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Nav className='m-auto'>
                    <Nav.Link className='navLink' href='/history' exact="true">
                        History
                    </Nav.Link>
                    <Nav.Link className='navLink' href='/favourites' exact="true">
                        Favourites
                    </Nav.Link>
                    <Nav.Link className='navLink' href='/logout' exact="true">
                        Logout
                    </Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;
