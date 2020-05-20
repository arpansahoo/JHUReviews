import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export default class Login extends Component {
    render() {        
        const props = this.props
        return(<>
            <div style={{paddingTop:"20px", paddingBottom:"30px"}}>
                <div style={{paddingBottom:"1px"}}>
                    <h2>Oops, you're not verified!</h2>
                    <h5 style={{color:"#6c757d"}}>Before you can react or post reviews, we'll need to verify that you're a JHU student.</h5>
                    <p style={{color:"#6c757d", fontSize:"0.9em", marginTop:"-2px"}}>If you don't sign in with an @jh.edu email, your reactions and reviews won't be posted. We don't record any information about you other than your name and email address.</p>
                </div>
                <StyledFirebaseAuth uiConfig={props.uiconfig} firebaseAuth={props.firebaseauth}/>
            </div>
        </>)
    }
}
