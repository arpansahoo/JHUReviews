import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Switch} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CourseList from "./components/course-list.component";
import ReviewForm from "./components/submit-review.component";
import Page404 from "./components/page404.component";
import Header from "./components/header.component";
import {Image, Jumbotron } from 'react-bootstrap'; 
import jay from "./images/jhu-cr-logo.png"
import FacebookLogin from 'react-facebook-login';
import history from "./history";


class App extends Component {
  constructor() {
    super()
    var signedIn = false;
    if (localStorage.getItem('sign-in') !== null) 
      signedIn = true;

    this.state = {
      isSignedIn: signedIn,
    }
  }

  responseFacebook = (response) => {
    if (response.userID != null) {
      localStorage.setItem('sign-in', 'true')
      localStorage.setItem('userID', response.userID)
      this.setState({
        isSignedIn: true
      })
    }
  }

  render() {
    if (!this.state.isSignedIn) {
      history.push('/');
      return(<>
        <Header />
        <div className="site-container flex-wrapper">
          <div style={{width:"60%"}}></div>
          <div style={{"textAlign":"center", "marginTop":"70px"}}>
            <Jumbotron style={{width: "100%", "paddingTop":"20px", "paddingBottom":"40px"}}>
              <Image src={jay} fluid />   
              <h5 style={{paddingBottom:"10px"}}>
                Search for high-quality courses and rate courses you've taken.
              </h5>
              <FacebookLogin
                autoLoad={true}
                appId="736328007172590"
                fields="name,email,picture"
                callback={this.responseFacebook}
                icon="fa-facebook"
              />
            </Jumbotron>
          </div>
          <div style={{width:"60%"}}></div>
        </div>
      </>)
    } else {
      return (
        <Router>
          <Switch>
            <Route path="/" exact component={() => <CourseList page={1} />} />
            <Route path="/page-:active/" exact component={CourseList} />
            <Route path="/submit-review/:id/:page/" component={ReviewForm} />
            <Route component={Page404} />
          </Switch>
        </Router>
      );
    }
  }
}

export default App;
