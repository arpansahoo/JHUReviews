import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export default class Login extends Component {
    render() {        
        const props = this.props
        return(<>
            <div style={{paddingTop:"20px", paddingBottom:"30px"}}>
                <div style={{paddingBottom:"15px"}}>
                    <h2>Oops, you're not verified yet!</h2>
                    <h5 style={{color:"#6c757d"}}>Before you can submit a review, we'll need to verify that you're human.</h5>
                </div>
                <StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={props.firebaseAuth}/>
            </div>
        </>)
    }
}
