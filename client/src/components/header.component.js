import React, { Component } from 'react';
import { Navbar, Nav, Image, Spinner } from 'react-bootstrap';
import ContactModal from './contact-modal.component';
import logo from "../images/logo1.png"

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
            <Navbar style={{marginBottom:"5px", backgroundColor:"white", boxShadow:"0 0 12px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.15)"}} sticky="top" collapseOnSelect expand="lg" variant="light">
                
                <Navbar.Brand href="/">
                    <div className="flex-wrapper">
                    <Image src={logo} style={{maxHeight:"30px", marginTop:"-2px", marginRight:"5px"}} fluid />
                    JHUReviews
                    <Spinner variant="primary" style={{marginTop: "0px", marginLeft: "15px"}} className={this.props.loading ? "":"hidden"} animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link active={this.state.showModal === true} onClick={() => this.handleToggleModal()}>About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <ContactModal show={this.state.showModal} onHide={() => this.handleToggleModal()} />
        </>)
    }
}

