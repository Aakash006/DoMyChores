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
                <Navbar.Brand className='navTitle' href='/' exact>
                    DoMyChores
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Nav className='m-auto'>
                    <Nav.Link className='navLink' href='/history' exact>
                        History
                    </Nav.Link>
                    <Nav.Link className='navLink' href='/favourites' exact>
                        Favourites
                    </Nav.Link>
                    <Nav.Link className='navLink' href='/logout' exact>
                        Logout
                    </Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;
