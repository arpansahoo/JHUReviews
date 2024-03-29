import React, { Component } from "react";
import axios from "axios";
import { Card, Badge, Button } from "react-bootstrap";
import firebase from "firebase/app";
import FacebookEmoji from "./FacebookEmoji";
import icons from "./Icon";

import "firebase/auth";
import { history } from "../../util";
import LoginModal from "../login-modal.component.js";

const Review = (props) => {
  const semesterString = props.rev.s;
  const semester = `${
    semesterString.slice(0, 1) === "F" ? "Fall" : "Spring"
  } 20${semesterString.slice(1)}`;
  const prefix =
    props.rev.b === "1" ? "Official Evaluation:  " : "Student Review:  ";

  const sep = props.isMobile ? <br /> : " | ";

  return (
    <>
      <Card
        style={{
          backgroundColor: "#f8f9fa",
          marginTop: "10px",
          marginBottom: props.isMobile ? "15px" : "10px",
        }}
      >
        <Card.Body
          style={{
            marginTop: "-5px",
            marginBottom: "-23px",
            marginRight: "-5px",
            marginLeft: "-5px",
          }}
        >
          <h6 style={{ marginBottom: "2px" }}>
            {semester}
            {sep}
            Instructor:
            {` ${props.rev.i.trim()}`}
            {sep}
            Rating:
            {` ${Number(props.rev.o).toPrecision(3)}`}
          </h6>
          <p style={{ textAlign: "left", fontSize: "0.90em" }}>
            <i>{prefix}</i>
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
      case "S18":
        return 1;
      case "F18":
        return 2;
      case "S19":
        return 3;
      case "F19":
        return 4;
      case "S20":
        return 5;
      default:
        return 6;
    }
  };

  // If reviews are from different semesters, put newer one first
  if (r1.s !== r2.s) {
    return numberSem(r2.s) - numberSem(r1.s);
  }

  // If from same semester, put school-supplied reviews first
  if (r1.b !== r2.b) {
    return r2.b - r1.b;
  }

  // If both are student reviews, put higher ratings first
  return Number.parseFloat(r2.o) - Number.parseFloat(r1.o);
};

const Reactions = (props) => {
  const love = (
    <FacebookEmoji
      icon={icons.find("facebook", "love")}
      label="love"
      number={props.reactions[0]}
      onSelect={() => props.react(0)}
      highlight={props.reactIndex === 0}
    />
  );

  const wow = (
    <FacebookEmoji
      icon={icons.find("facebook", "wow")}
      number={props.reactions[1]}
      label="interesting"
      onSelect={() => props.react(1)}
      highlight={props.reactIndex === 1}
    />
  );

  const sad = (
    <FacebookEmoji
      icon={icons.find("facebook", "sad")}
      number={props.reactions[2]}
      label="sad"
      onSelect={() => props.react(2)}
      highlight={props.reactIndex === 2}
    />
  );

  const angry = (
    <FacebookEmoji
      icon={icons.find("facebook", "angry")}
      number={props.reactions[3]}
      label="angry"
      onSelect={() => props.react(3)}
      highlight={props.reactIndex === 3}
    />
  );

  const like = (
    <FacebookEmoji
      icon={icons.find("facebook", "like")}
      number={props.reactions[4]}
      label="like"
      onSelect={() => props.react(4)}
      highlight={props.reactIndex === 4}
    />
  );

  const dislike = (
    <FacebookEmoji
      icon={icons.find("facebook", "dislike")}
      number={props.reactions[5]}
      label="dislike"
      onSelect={() => props.react(5)}
      highlight={props.reactIndex === 5}
    />
  );

  if (props.isMobile) {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "13%", marginRight: "11px" }}>{love}</div>
        <div style={{ width: "13%", marginRight: "11px" }}>{wow}</div>
        <div style={{ width: "13%", marginRight: "11px" }}>{sad}</div>
        <div style={{ width: "13%", marginRight: "11px" }}>{angry}</div>
        <div style={{ width: "13%", marginRight: "11px" }}>{like}</div>
        <div style={{ width: "13%" }}>{dislike}</div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        marginTop: "-5px",
        marginBottom: "-2px",
      }}
    >
      <div style={{ width: "50px", marginRight: "15px" }}>{love}</div>
      <div style={{ width: "50px", marginRight: "15px" }}>{wow}</div>
      <div style={{ width: "50px", marginRight: "15px" }}>{sad}</div>
      <div style={{ width: "50px", marginRight: "15px" }}>{angry}</div>
      <div style={{ width: "50px", marginRight: "15px" }}>{like}</div>
      <div style={{ width: "50px", marginRight: "15px" }}>{dislike}</div>
    </div>
  );
};

const mean = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i += 1) {
    sum += array[i];
  }
  return sum / array.length;
};

const calculateStats = (currentCourse) => {
  const overallQualityRatings = [];
  const workloadRatings = [];
  const difficultyRatings = [];
  const gradingRatings = [];
  const learningRatings = [];
  const teacherRatings = [];

  currentCourse.rev.forEach((review) => {
    // Old review (from pdf) which only contains overall quality rating
    if (review.b === "1") {
      // Old reviews are worth 5 new reviews
      for (let j = 0; j < 5; j += 1) {
        overallQualityRatings.push(Number.parseFloat(review.o));
      }
      // New review
    } else if (review.b === "0") {
      overallQualityRatings.push(Number.parseFloat(review.o));
      workloadRatings.push(Number.parseFloat(review.w));
      difficultyRatings.push(Number.parseFloat(review.d));
      gradingRatings.push(Number.parseFloat(review.g));
      learningRatings.push(Number.parseFloat(review.l));
      teacherRatings.push(Number.parseFloat(review.t));
    }
  });

  return {
    overallQuality: mean(overallQualityRatings),
    workload: mean(workloadRatings),
    difficulty: mean(difficultyRatings),
    grading: mean(gradingRatings),
    learning: mean(learningRatings),
    teacherRating: mean(teacherRatings),
  };
};

export default class Reviews extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    const reviews = props.course.rev;
    const reactions = props.course.e;
    const reactIndex = -1;
    const stats = calculateStats(props.course);
    this.state = {
      showModal: false,
      reviews,
      reactions,
      reactIndex,
      overallQuality: stats.overallQuality,
      workload: stats.workload,
      difficulty: stats.difficulty,
      grading: stats.grading,
      learning: stats.learning,
      teacherRating: stats.teacherRating,
      isSignedIn: false,
      uid: null,
      uiConfig: {
        signInFlow: "popup",
        signInOptions: ["microsoft.com"],
        callbacks: {
          signInSuccessWithAuthResult: () => false,
        },
      },
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => this.login(user));

    axios
      .get(
        `https://jhu-course-rating-api.herokuapp.com/courses/${this.props.course._id}`
      )
      // .get('http://localhost:4000/courses/'+this.props.course._id)
      .then((response) => {
        if (this._isMounted) {
          const stats = calculateStats(response.data);
          this.setState({
            reactions: response.data.e,
            reviews: response.data.rev,
            overallQuality: stats.overallQuality,
            workload: stats.workload,
            difficulty: stats.difficulty,
            grading: stats.grading,
            learning: stats.learning,
            teacherRating: stats.teacherRating,
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
        // .get('http://localhost:4000/courses/react-index/'+this.props.course._id+"/"+this.state.uid)
        .then((response) => {
          if (this._isMounted) {
            this.setState({
              reactIndex: JSON.parse(response.data),
            });
          }
        })
        .catch((error) => {});
    }

    // Push to new url but keep current url in state
    if (this.state.submitReview && !this.state.submitReact) {
      const urlParams = new URLSearchParams(window.location.search);
      this.props.history.push(
        `/submit-review/${this.props.course._id}/${urlParams.toString()}`,
        {
          previous: history.location.pathname + history.location.search,
        }
      );
      window.location.reload();
    }
  }

  handleToggleModal() {
    if (this._isMounted) {
      this.setState({
        showModal: !this.state.showModal,
        submitReview: false,
      });
    }
  }

  review() {
    if (!this.state.isSignedIn && this._isMounted) {
      this.setState({
        showModal: !this.state.showModal,
        submitReview: true,
        submitReact: false,
      });
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      this.props.history.push(
        `/submit-review/${this.props.course._id}/${urlParams.toString()}`
      );
      window.location.reload();
    }
  }

  stats() {
    // const { course } = this.props;

    const statsBadge = (ratingName, rating, flipColorScale) => {
      let badgeColor;
      if (rating == null || Number.isNaN(rating)) {
        badgeColor = "dark";
      } else if (
        (!flipColorScale && rating < 3) ||
        (flipColorScale && rating >= 4)
      ) {
        badgeColor = "danger";
      } else if (
        (!flipColorScale && rating < 4) ||
        (flipColorScale && rating >= 3)
      ) {
        badgeColor = "warning";
      } else if (
        (!flipColorScale && rating >= 4) ||
        (flipColorScale && rating < 3)
      ) {
        badgeColor = "success";
      }

      const formattedRating =
        rating == null || Number.isNaN(rating) ? "N/A" : rating.toPrecision(3);

      return (
        <h5
          style={{
            marginRight: "10px",
            width: this.props.isMobile ? "38%" : "auto",
          }}
        >
          <Badge
            variant={badgeColor}
            style={{
              textAlign: "left",
              padding: "8px",
              fontWeight: "400",
              width: "100%",
            }}
          >
            {`${ratingName}: ${formattedRating}`}
          </Badge>
        </h5>
      );
    };

    if (this._isMounted) {
      return (
        <>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {statsBadge("Overall", this.state.overallQuality)}
            {statsBadge("Workload", this.state.workload, true)}
            {statsBadge("Difficulty", this.state.difficulty, true)}
            {statsBadge("Grading", this.state.grading, true)}
            {statsBadge("Gainz", this.state.learning)}
            {statsBadge("Instructor", this.state.teacherRating)}
          </div>
        </>
      );
    }
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
      // .post('http://localhost:4000/courses/react/'+this.props.course._id+"/"+num+"/"+this.state.uid)
      .then((res) => {
        if (this._isMounted) {
          this.setState({
            reactions: res.data,
            reactIndex: index,
            submitReact: true,
            submitReview: false,
          });
        }
      })
      .catch((error) => {
        if (this._isMounted) {
          this.setState({
            showModal: true,
            submitReact: true,
            submitReview: false,
          });
        }
      });
  }

  render() {
    if (this.state.reviews.length === 0) {
      // no reviews yet, display prompt to submit first review
      return (
        <>
          <LoginModal
            title="Oops, you're not logged in!"
            show={this.state.showModal && !this.state.isSignedIn}
            onHide={() => this.handleToggleModal()}
            uiconfig={this.state.uiConfig}
            firebaseauth={firebase.auth()}
          />
          <h5 style={{ paddingTop: "5px" }}>Reactions</h5>
          <Reactions
            react={this.react.bind(this)}
            reactions={this.state.reactions}
            reactIndex={this.state.reactIndex}
            isMobile={this.props.isMobile}
          />

          <h5 style={{ paddingTop: "0px" }}>Reviews</h5>
          <p>No one has reviewed this course yet. Be the first!</p>
          <Button
            onClick={() => this.review()}
            variant="outline-primary"
            size="sm"
            style={{ marginTop: "-5px", marginBottom: "8px" }}
          >
            Submit a Review
          </Button>
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

        <h5 style={{ paddingTop: "5px" }}>Reactions</h5>
        <Reactions
          react={this.react.bind(this)}
          reactions={this.state.reactions}
          reactIndex={this.state.reactIndex}
          isMobile={this.props.isMobile}
        />

        <h5 style={{ paddingBottom: "3px" }}>Average Stats</h5>
        {this.stats()}

        <div className="flex-wrapper">
          <h5 style={{ paddingTop: "15px" }}>Reviews</h5>
          <div>
            <Button
              onClick={() => this.review()}
              variant="outline-primary"
              size="sm"
              style={{ marginTop: "11.7px", marginLeft: "10px" }}
            >
              Submit a Review
            </Button>
          </div>
        </div>
        <div>
          {this.state.reviews
            .sort(cmpReviews)
            .filter((rev) => rev.c)
            .map((review, key) => (
              <Review
                rev={review}
                key={`review-${key}`}
                isMobile={this.props.isMobile}
              />
            ))}
        </div>
      </>
    );
  }
}
