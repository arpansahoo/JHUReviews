import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import firebase from 'firebase/app';
import CourseListPage from './components/CourseListPage/CourseListPage';
import ReviewForm from './components/submit-review.component';
import Page404 from './components/page404.component';

import firebaseConfig from './firebase-config';

firebase.initializeApp(firebaseConfig);

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={CourseListPage} />
      <Route path="/submit-review/:id/:redirect" component={ReviewForm} />
      <Route path="/submit-review/:id" component={ReviewForm} />
      <Route component={Page404} />
    </Switch>
  </Router>
);

export default App;
