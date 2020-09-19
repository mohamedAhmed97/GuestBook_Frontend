import React from 'react';
import './styles/navbar.css'
import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
} from 'reactstrap';
import {Link} from 'react-router-dom'

const NavBar = (props) => {
    return (
        <div>
            <Navbar className="navbar_header" light expand="md">
                <Link to="/" className="navbar_Brand"> GuestBook</Link>
                <Collapse  navbar>
                    <Nav className="mr-auto navbar_header navbar">
                        <NavItem>
                            <Link className="ml-3 navbar_links" to="/">Home</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;