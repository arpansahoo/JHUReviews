import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Switch} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CourseList from "./components/course-list.component";
import ReviewForm from "./components/submit-review.component";
import Page404 from "./components/page404.component";

import firebase from 'firebase/app';
import firebaseConfig from './firebase-config';
firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
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

export default App;