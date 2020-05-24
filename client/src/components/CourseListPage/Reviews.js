import React, { Component } from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Badge, Button } from 'react-bootstrap';
import firebase from 'firebase/app';
import FacebookEmoji from './FacebookEmoji';
import icons from './Icon';

import 'firebase/auth';
import history from '../../history';
import LoginModal from '../login-modal.component.js';

const Review = (props) => {
  let semester = props.rev.s;
  if (semester === 'S20') {
    semester = 'Spring 2020';
  } else if (semester === 'F19') {
    semester = 'Fall 2019';
  } else if (semester === 'S19') {
    semester = 'Spring 2019';
  } else if (semester === 'F18') {
    semester = 'Fall 2018';
  } else if (semester === 'S18') {
    semester = 'Spring 2018';
  }

  const prefix = props.rev.b === '1' ? 'Official Course Evaluation:  ' : 'Student Review:  ';

  return (
    <>
      <Card style={{ backgroundColor: '#f8f9fa', marginTop: '10px', marginBottom: '10px' }}>
        <Card.Body style={{ paddingTop: '15px', paddingBottom: '0px' }}>
          <b style={{ fontSize: '1em' }}>
            {semester} | Instructor:
            {props.rev.i.trim()} | Rating:
            {Number(props.rev.d).toPrecision(3)}
          </b>
          <p style={{ fontSize: '0.92em' }}>
            <b>{prefix}</b>
            {props.rev.c.trim()}
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

const cmpReviews = (r1, r2) => {
  const numberSem = (sem) => {
    switch (sem) {
      case 'S18':
        return 1;
      case 'F18':
        return 2;
      case 'S19':
        return 3;
      case 'F19':
        return 4;
      default:
        return 5;
    }
  };

  // If reviews are from different semesters, put newer one first
  if (r1.s !== r2.s) {
    return numberSem(r2.s) - numberSem(r1.s);
  }

  // If from same semester, put school-supplied reviews first
  return r2.b - r1.b;
};

export default class Reviews extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    const reactions = props.course.e;
    const reactIndex = -1;

    this.state = {
      showModal: false,
      reactions,
      reactIndex,
      isSignedIn: false,
      uid: null,
      uiConfig: {
        signInFlow: 'popup',
        signInOptions: ['microsoft.com'],
        callbacks: {
          signInSuccessWithAuthResult: () => false
        }
      }
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => this.login(user));
    axios
      .get(`https://jhu-course-rating-api.herokuapp.com/courses/${this.props.course._id}`)
      // axios.get('http://localhost:4000/courses/'+this.props.course._id)
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            reactions: response.data.e
          });
        }
      })
      .catch((error) => {});
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
    this._isMounted = false;
  }

  login(user) {
    let id = null;
    if (user) {
      id = user.uid;
    }
    if (this._isMounted) {
      this.setState({ isSignedIn: !!user, uid: id });
    }
    if (user) {
      axios
        .get(
          `https://jhu-course-rating-api.herokuapp.com/courses/react-index/${this.props.course._id}/${this.state.uid}`
        )
        // axios.get('http://localhost:4000/courses/react-index/'+this.props.course._id+"/"+this.state.uid)
        .then((response) => {
          if (this._isMounted) {
            this.setState({
              reactIndex: JSON.parse(response.data)
            });
          }
        })
        .catch((error) => {});
    }

    // Push to new url but keep current url in state
    if (this.state.submitReview && !this.state.submitReact) {
      this.props.history.push(`/submit-review/${this.props.course._id}`, {
        previous: history.location.pathname + history.location.search
      });
      window.location.reload();
    }
  }

  handleToggleModal() {
    if (this._isMounted) {
      this.setState({
        showModal: !this.state.showModal,
        submitReview: false
      });
    }
  }

  reviewToggleModal() {
    if (this.state.uid === null && this._isMounted) {
      this.setState({
        showModal: !this.state.showModal,
        submitReview: true,
        submitReact: false
      });
    } else {
      this.props.history.push(`/submit-review/${this.props.course._id}`);
      window.location.reload();
    }
  }

  stats() {
    const { course } = this.props;

    const statsBadge = (ratingName, rating) => {
      const badgeColor = Number.isNaN(rating)
        ? 'dark'
        : rating < 3
        ? 'danger'
        : rating < 4
        ? 'warning'
        : 'success';

      const formattedRating = Number.isNaN(rating) ? 'N/A' : rating.toPrecision(3);

      return (
        <h5>
          <Badge
            variant={badgeColor}
            style={{ padding: '8px', marginRight: '10px', fontWeight: '400' }}
          >
            {`${ratingName}: ${formattedRating}`}
          </Badge>
        </h5>
      );
    };

    return (
      <>
        <div className="flex-wrapper">
          {statsBadge('Overall', course.overallQuality)}
          {statsBadge('Workload', course.workload)}
          {statsBadge('Difficulty', course.difficulty)}
          {statsBadge('Grading', course.grading)}
          {statsBadge('Learning', course.learning)}
          {statsBadge('Instructor', course.teacherRating)}
        </div>
      </>
    );
  }

  react(num) {
    const same = this.state.reactIndex === num;
    let index = -1;
    if (!same) {
      index = num;
    }
    axios
      .post(
        `https://jhu-course-rating-api.herokuapp.com/courses/react/${this.props.course._id}/${num}/${this.state.uid}`
      )
      // axios.post('http://localhost:4000/courses/react/'+this.props.course._id+"/"+num+"/"+this.state.uid)
      .then((res) => {
        if (this._isMounted) {
          this.setState({
            reactions: res.data,
            reactIndex: index,
            submitReact: true,
            submitReview: false
          });
        }
      })
      .catch((error) => {
        if (this._isMounted) {
          this.setState({
            showModal: true,
            submitReact: true,
            submitReview: false
          });
        }
      });
  }

  render() {
    const { props } = this;
    const { course } = props;

    if (props.course.rev.length === 0) {
      // no reviews yet, display prompt to submit first review
      return (
        <>
          <h4 style={{ paddingTop: '5px' }}>Reviews</h4>
          <p>No one has reviewed this course yet. Be the first!</p>
          <Link to={`/submit-review/${course._id}`}>
            <Button
              variant="outline-primary"
              size="sm"
              style={{ marginTop: '-5px', marginBottom: '10px' }}
            >
              Submit a Review
            </Button>
          </Link>
        </>
      );
    }

    return (
      <>
        <LoginModal
          title="Oops, you're not logged in!"
          show={this.state.showModal && this.state.uid === null}
          onHide={() => this.handleToggleModal()}
          uiconfig={this.state.uiConfig}
          firebaseauth={firebase.auth()}
        />
        <h5>Reactions</h5>
        <div
          className="flex-wrapper"
          style={{ marginTop: '-5px', marginBottom: '-2px', marginLeft: '-4px' }}
        >
          <div style={{ width: '48px', marginRight: '15px' }}>
            <FacebookEmoji
              icon={icons.find('facebook', 'love')}
              label="love"
              number={this.state.reactions[0]}
              onSelect={() => this.react(0)}
              highlight={this.state.reactIndex === 0}
            />
          </div>
          <div style={{ width: '48px', marginRight: '15px' }}>
            <FacebookEmoji
              icon={icons.find('facebook', 'wow')}
              number={this.state.reactions[1]}
              label="interesting"
              onSelect={() => this.react(1)}
              highlight={this.state.reactIndex === 1}
            />
          </div>
          <div style={{ width: '48px', marginRight: '15px' }}>
            <FacebookEmoji
              icon={icons.find('facebook', 'sad')}
              number={this.state.reactions[2]}
              label="sad"
              onSelect={() => this.react(2)}
              highlight={this.state.reactIndex === 2}
            />
          </div>
          <div style={{ width: '48px', marginRight: '15px' }}>
            <FacebookEmoji
              icon={icons.find('facebook', 'angry')}
              number={this.state.reactions[3]}
              label="angry"
              onSelect={() => this.react(3)}
              highlight={this.state.reactIndex === 3}
            />
          </div>
          <div style={{ width: '48px', marginRight: '15px' }}>
            <FacebookEmoji
              icon={icons.find('facebook', 'like')}
              number={this.state.reactions[4]}
              label="like"
              onSelect={() => this.react(4)}
              highlight={this.state.reactIndex === 4}
            />
          </div>
          <div style={{ width: '48px', marginRight: '15px' }}>
            <FacebookEmoji
              icon={icons.find('facebook', 'dislike')}
              number={this.state.reactions[5]}
              label="dislike"
              onSelect={() => this.react(5)}
              highlight={this.state.reactIndex === 5}
            />
          </div>
        </div>

        <h5>Average Stats</h5>
        {this.stats()}
        <div className="flex-wrapper">
          <h5 style={{ paddingTop: '15px' }}>Reviews</h5>
          <div>
            <Button
              onClick={() => this.reviewToggleModal()}
              variant="outline-primary"
              size="sm"
              style={{ marginTop: '11.7px', marginLeft: '10px' }}
            >
              Submit a Review
            </Button>
          </div>
        </div>
        <div>
          {props.course.rev.sort(cmpReviews).map((review, key) => (
            <Review rev={review} key={`review-${key}`} />
          ))}
        </div>
      </>
    );
  }
}
