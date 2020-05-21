import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export default class LoginModal extends Component {
   render() {
        const props = this.props
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Before you can react or post reviews, we'll need to verify that you're a JHU student.</p>
                    <p style={{color:"#6c757d", fontSize:"0.9em", marginTop:"-15px"}}>If you don't login with an @jh.edu email, your reactions and reviews won't be posted. We don't record any information about you other than your email address.</p>
                    <StyledFirebaseAuth uiConfig={props.uiconfig} firebaseAuth={props.firebaseauth}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}