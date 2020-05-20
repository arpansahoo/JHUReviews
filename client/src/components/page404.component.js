import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import jay from "../images/jay.gif"
import Header from "./header.component";
import {Image} from 'react-bootstrap'; 

export default class Page404 extends Component {
    render() {
        return(<>
            <Header />
            <div className="site-container">
                <h2 style={{paddingTop:"20px"}}>Oops, we can't find the page you're looking for.</h2>   
                <h5 style={{color:"#6c757d"}}>Click <Link to={"/page-1/"}>here</Link> to go back to the main page.</h5>  
                <Image src={jay} style={{maxHeight:"500px"}} fluid />   
            </div>
        </>);
    }
}