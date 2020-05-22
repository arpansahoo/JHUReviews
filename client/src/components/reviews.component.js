import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios';
import { Card, Badge, Button } from 'react-bootstrap';
import FacebookEmoji from "./facebook-emoji.component"
import icons from './icon' 

import firebase from 'firebase/app';
import 'firebase/auth';
import LoginModal from "./login-modal.component.js"

class Review extends Component {
    avg() {
        const props = this.props
        var rating = 0;
        rating += Number.parseFloat(props.rev.w)
        rating += Number.parseFloat(props.rev.d)
        rating += Number.parseFloat(props.rev.g)
        rating += Number.parseFloat(props.rev.l)
        rating += Number.parseFloat(props.rev.t)
        rating /= 5;
        return Number(rating).toPrecision(3)
    }

    render() {
        var semester = this.props.rev.s
        if (semester == null) 
            semester = "S20"
        if (semester === "S20") {
            semester = "Spring 2020"
        } else if (semester === "F19") {
            semester = "Fall 2019"
        } else if (semester === "S19") {
            semester = "Spring 2019"
        } else if (semester === "F18") {
            semester = "Fall 2018"
        } else if (semester === "S18") {
            semester = "Spring 2018"
        }
        return (<>
            <Card style={{backgroundColor: "#f8f9fa", marginTop: "10px", marginBottom: "10px"}}>
                <Card.Body style={{paddingTop: "15px", paddingBottom: "0px"}}>
                    <b style={{fontSize:"0.95em"}}>{semester} | Instructor: {this.props.rev.i.trim()} | Rating: {this.avg()}</b>
                    <p style={{fontSize:"0.85em"}}>{this.props.rev.c.trim()}</p>
                </Card.Body>
            </Card>
        </>)
    }
}

export default class Reviews extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        var reactions = props.course.e
        var reactIndex = -1

        this.state = {
            showModal: false,
            reactions: reactions,
            reactIndex: reactIndex, 
            isSignedIn: false,
            uid: null,
            uiConfig: {
                signInFlow: 'popup',
                signInOptions: [
                    'microsoft.com'
                ],
                callbacks: {
                    signInSuccessWithAuthResult: () => false
                }
            }
        }
    }

    login(user) {
        var id = null;
        if (user)
            id = user.uid
        if (this._isMounted) 
            this.setState({isSignedIn: !!user, uid: id})
        if (!!user) {
            axios.get('https://jhu-course-rating-api.herokuapp.com/courses/react-index/'+this.props.course._id+"/"+this.state.uid)
            // axios.get('http://localhost:4000/courses/react-index/'+this.props.course._id+"/"+this.state.uid)
                .then(response => {
                    if (this._isMounted) {
                        this.setState({
                            reactIndex: JSON.parse(response.data),
                        })   
                    }
                })
                .catch(function (error) {})
        }

        if (this.state.submitReview && !this.state.submitReact) {
            this.props.history.push("/submit-review/"+this.props.course._id+"/"+this.props.page)
            window.location.reload()
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.login(user)
        );
        axios.get('https://jhu-course-rating-api.herokuapp.com/courses/'+this.props.course._id)
        // axios.get('http://localhost:4000/courses/'+this.props.course._id)
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        reactions: response.data.e,
                    })   
                }
            })
            .catch(function (error) {
            })
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
        this._isMounted = false;
    }

    toggleModal() {
        if (this._isMounted) {
            this.setState({
                showModal: !this.state.showModal,
                submitReview: false
            })
        }
    }

    stats() {
        const props = this.props
        var ratings = props.ratings
        var variants = ["success", "success", "success", "success", "success"]
        for (var i = 0; i < ratings.length; i++) {
            if (ratings[i] < 3.00) {
                variants[i] = "danger"
            } else if (ratings[i] < 4.00) {
                variants[i] = "warning"
            } 
        }

        return (<>
            <div className="flex-wrapper">
                <h5><Badge variant={variants[0]} style={{padding: "8px", marginRight: "10px", fontWeight: "400"}}>Workload: {ratings[0]}</Badge></h5>
                <h5><Badge variant={variants[1]} style={{padding: "8px", marginRight: "10px", fontWeight: "400"}}>Difficulty: {ratings[1]}</Badge></h5>
                <h5><Badge variant={variants[2]} style={{padding: "8px", marginRight: "10px", fontWeight: "400"}}>Grading: {ratings[2]}</Badge></h5>
                <h5><Badge variant={variants[3]} style={{padding: "8px", marginRight: "10px", fontWeight: "400"}}>Learning: {ratings[3]}</Badge></h5>
                <h5><Badge variant={variants[4]} style={{padding: "8px", fontWeight: "400"}}>Instructor Quality: {ratings[4]}</Badge></h5>
            </div>
        </>)
    }

    review() {
        if (!this.state.isSignedIn && this._isMounted) {
            this.setState({
                showModal: !this.state.showModal,
                submitReview: true,
                submitReact: false
            })
        } else {
            this.props.history.push("/submit-review/"+this.props.course._id+"/"+this.props.page)
            window.location.reload()
        }
    }

    react(num) {
        const here = this
        var same = this.state.reactIndex === num
        var index = -1
        if (!same)
            index = num

        if (!this.state.isSignedIn && this._isMounted) {
            this.setState({
                showModal: !this.state.showModal,
                submitReview: false,
                submitReact: true
            })
        } else {
            axios.post('https://jhu-course-rating-api.herokuapp.com/courses/react/'+this.props.course._id+"/"+num+"/"+this.state.uid)
            // axios.post('http://localhost:4000/courses/react/'+this.props.course._id+"/"+num+"/"+this.state.uid)
                .then(function(res) {
                    if (here._isMounted) {
                        here.setState({
                            reactions: res.data,
                            reactIndex: index,
                            submitReact: true,
                            submitReview: false
                        })
                    }
                })
                .catch(function (error) {})
        }
    }

    render() {
        const props = this.props
        var here = this

        if (props.course.rev.length > 0) {
            return (<>     
                <LoginModal title="Oops, you're not logged in!" show={this.state.showModal && !this.state.isSignedIn} onHide={() => this.toggleModal()} uiconfig={this.state.uiConfig} firebaseauth={firebase.auth()} />
                <h5 style={{paddingTop: "5px"}}>Reactions</h5>
                <div className="flex-wrapper" style={{marginTop: "-5px", marginBottom:"-2px", marginLeft:"-4px"}}>
                    <div style={{width: "48px", marginRight: "15px"}}>
                        <FacebookEmoji
                            icon={ icons.find("facebook", "love") }
                            label="love"
                            number={this.state.reactions[0]}
                            onSelect={() => this.react(0)}
                            highlight={this.state.reactIndex === 0}
                        />
                    </div>
                    <div style={{width: "48px", marginRight: "15px"}}>
                        <FacebookEmoji
                            icon={ icons.find("facebook", "wow") }
                            number={this.state.reactions[1]}
                            label="interesting"
                            onSelect={() => this.react(1)}
                            highlight={this.state.reactIndex === 1}
                        />
                    </div>
                    <div style={{width: "48px", marginRight: "15px"}}>
                        <FacebookEmoji
                            icon={ icons.find("facebook", "sad") }
                            number={this.state.reactions[2]}
                            label="sad"
                            onSelect={() => this.react(2)}
                            highlight={this.state.reactIndex === 2}
                        />
                    </div>
                    <div style={{width: "48px", marginRight: "15px"}}>
                        <FacebookEmoji
                            icon={ icons.find("facebook", "angry") }
                            number={this.state.reactions[3]}
                            label="angry"
                            onSelect={() => this.react(3)}
                            highlight={this.state.reactIndex === 3}
                        />
                    </div>
                    <div style={{width: "48px", marginRight: "15px"}}>
                        <FacebookEmoji
                            icon={ icons.find("facebook", "like") }
                            number={this.state.reactions[4]}
                            label="like"
                            onSelect={() => this.react(4)}
                            highlight={this.state.reactIndex === 4}
                        />
                    </div>
                    <div style={{width: "48px", marginRight: "15px"}}>
                        <FacebookEmoji
                            icon={ icons.find("facebook", "dislike") }
                            number={this.state.reactions[5]}
                            label="dislike"
                            onSelect={() => this.react(5)}
                            highlight={this.state.reactIndex === 5}
                        />
                    </div>
                </div>

                <h5>Average Stats</h5>
                { this.stats() }  

                <div className="flex-wrapper">
                    <h5 style={{paddingTop: "15px"}}>Reviews</h5>
                    <div>
                        <Button onClick={() => this.review()} variant="outline-primary" size="sm" style={{marginTop: "11.7px", marginLeft:"10px"}}>Submit a Review</Button>
                    </div>
                </div>
                <div>
                    {props.course.rev.sort(function(a, b) {
                        var cmp = here.cmp(a.s, b.s)
                        if (cmp[0] < cmp[1]) {
                            return 1
                        } else {
                            var a_rating = (Number.parseFloat(a.w) + Number.parseFloat(a.d) + Number.parseFloat(a.l) + Number.parseFloat(a.g) + Number.parseFloat(a.t)) / 5
                            var b_rating = (Number.parseFloat(b.w) + Number.parseFloat(b.d) + Number.parseFloat(b.l) + Number.parseFloat(b.g) + Number.parseFloat(b.t)) / 5
                            if (a_rating > b_rating) 
                                return -1
                            return 1
                        }
                    }).map((review, key) =>
                        <Review rev={review} key={key} />
                    )}
                </div>
            </>)
        }
        // no reviews yet, display prompt to submit first review 
        return (<>
                <LoginModal title="Oops, you're not logged in!" show={this.state.showModal && !this.state.isSignedIn} onHide={() => this.toggleModal()} uiconfig={this.state.uiConfig} firebaseauth={firebase.auth()} />
                <h5 style={{paddingTop: "5px"}}>Reviews</h5>
                <p>No one has reviewed this course yet. Be the first!</p>
                <Button onClick={() => this.review()} variant="outline-primary" size="sm" style={{marginTop: "-5px", marginBottom: "10px"}} >Submit a Review</Button>
        </>)
    }

    cmp(aSem, bSem) {
        switch(aSem) {
            case "S18":
                aSem = 1
                break
            case "F18":
                aSem = 2
                break
            case "S19":
                aSem = 3
                break
            case "F19":
                aSem = 4
                break
            default:
                aSem = 5
                break
        }
        switch(bSem) {
            case "S18":
                bSem = 1
                break
            case "F18":
                bSem = 2
                break
            case "S19":
                bSem = 3
                break
            case "F19":
                bSem = 4
                break
            default:
                bSem = 5
                break
        }
        return [aSem, bSem]
    }

}