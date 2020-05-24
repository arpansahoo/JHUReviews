import React, { Component } from 'react';
import { Navbar, Nav, Image, Spinner } from 'react-bootstrap';
import AboutModal from './about-modal.component';
import LoginModal from './login-modal.component';
import logo from "../images/logo1.png"
import firebase from 'firebase/app';
import history from "../history";
import 'firebase/auth';

export default class Header extends Component {
    constructor() {
        super();
        var isSignedIn = false;
        if (localStorage.getItem('loggedIn') === "true") 
            isSignedIn = true

        this.state = {
            showModal: false,
            showLoginModal: false,
            isSignedIn: isSignedIn,
            logout: false,
            uid: null,
            uiConfig: {
                signInFlow: 'popup',
                signInOptions: [
                    'microsoft.com'
                ],
                callbacks: {
                    signInSuccessWithAuthResult: () => false
                }
            }
        }
    }

    login(user) {
        var id = null;
        if (user)
            id = user.uid
        this.setState({isSignedIn: !!user, uid: id})
        if (!!user) {
            localStorage.setItem('loggedIn', true)
        } else {
            localStorage.setItem('loggedIn', false)
        }
    }

    logout() {
        firebase.auth().signOut()
        this.setState({
            logout: true,
        })
        if (this.props.submit) {
            history.push('/')
            window.location.reload()
        }
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.login(user)
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    handleToggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    toggleLoginModal() {
        this.setState({
            showLoginModal: !this.state.showLoginModal,
            logout: false
        })
    }

    render() {        
        return(<>
            <Navbar style={{marginBottom:"5px", backgroundColor:"white", boxShadow:"0 0 12px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.15)"}} sticky="top" collapseOnSelect expand="lg" variant="light">
                
                <Navbar.Brand href="/">
                    <div className="flex-wrapper">
                    <Image src={logo} style={{maxHeight:"30px", marginTop:"0px", marginRight:"5px"}} fluid />
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
                        {this.state.isSignedIn && 
                            <Nav.Link onClick={() => this.logout()}>
                                Logout
                            </Nav.Link>
                        }
                        {!this.state.isSignedIn && 
                            <Nav.Link onClick={() => this.toggleLoginModal()} >
                                Login
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <AboutModal show={this.state.showModal} onHide={() => this.handleToggleModal()} />
            <LoginModal title="Login to JHUReviews" show={this.state.showLoginModal && !this.state.isSignedIn && !this.state.logout} onHide={() => this.toggleLoginModal()} uiconfig={this.state.uiConfig} firebaseauth={firebase.auth()} />
        </>)
    }
}

