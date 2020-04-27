import React, { Component } from 'react';
import jay from "../images/jay.gif"
import Header from "./header.component";
import {Image} from 'react-bootstrap'; 

export default class Page404 extends Component {
    render() {
        return(<>
            <Header />
            <div className="site-container">
                <h2 style={{paddingTop:"20px"}}>Oops, we can't seem to find the page you're looking for.</h2>   
                <h5 style={{color:"#6c757d"}}>Click a link in the header to go back to a valid page.</h5>  
                <Image src={jay} style={{maxHeight:"500px"}} fluid />   
            </div>
        </>);
    }
}