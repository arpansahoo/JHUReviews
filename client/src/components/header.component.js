import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import ContactModal from './contact-modal.component';

export default class Header extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    handleToggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {        
        return(<>
            <Navbar style={{marginBottom:"5px", backgroundColor:"white", "box-shadow":"0 0 12px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.15)"}} sticky="top" collapseOnSelect expand="lg" variant="light">
                <Navbar.Brand href="/">JHU Course Reviews</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link active={this.props.active === "bookmark"} disabled>Bookmarked Courses</Nav.Link>
                        <Nav.Link active={this.props.active === "contact"} onClick={() => this.handleToggleModal()}>About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <ContactModal show={this.state.showModal} onHide={() => this.handleToggleModal()} />
        </>)
    }
}

