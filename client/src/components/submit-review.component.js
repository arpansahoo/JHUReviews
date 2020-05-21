import React, { Component, useState } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, InputGroup, Col } from 'react-bootstrap';
import Popover from "./popover.component";
import history from "../history";
import Header from "./header.component";

import firebase from 'firebase/app';
import 'firebase/auth';
import Login from "./login.component";

export default class ReviewForm extends Component {
    constructor(props) {
        super(props);

        this.changeText = this.changeText.bind(this);
        this.changeWorkload = this.changeWorkload.bind(this);
        this.changeDifficulty = this.changeDifficulty.bind(this);
        this.changeLearning = this.changeLearning.bind(this);
        this.changeGrading = this.changeGrading.bind(this);
        this.changeInstructorQuality = this.changeInstructorQuality.bind(this);
        this.changeSemester = this.changeSemester.bind(this);
        this.changeInstructorName = this.changeInstructorName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        var isSignedIn = false;
        if (localStorage.getItem('loggedIn') === "true") 
            isSignedIn = true

        this.state = {
            number: '',
            title: '',
            text: '',
            workload: '',
            difficulty: '',
            learning: '',
            instructor_quality: '',
            grading: '',
            semester: '',
            instructor_name: '', 
            isSignedIn: isSignedIn,
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
        this.setState({isSignedIn: !!user, uid: id})
        if (!!user) {
            localStorage.setItem('loggedIn', true)
        } else {
            localStorage.setItem('loggedIn', false)
        }
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.login(user)
        );
        axios.get('https://jhu-course-rating-api.herokuapp.com/courses/'+this.props.match.params.id)
        // axios.get('http://localhost:4000/courses/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    number: response.data.num,
                    title: response.data.n,
                })   
            })
            .catch(function (error) {
            })
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }
    
    onSubmit(e) {
        e.preventDefault()
        var array = [this.state.text, this.state.workload, this.state.difficulty, this.state.learning, this.state.grading, this.state.instructor_quality, this.state.semester, this.state.instructor_name]
        if (array[6] === "")
            array[6] = "Spring 2020"
        for (let i = 0; i < array.length; i++) {
            if (array[i] === "")
                array[i] = "3.00"
        }
        
        const obj = {
            s: array[6],
            i: array[7],
            c: array[0],
            w: array[1],
            d: array[2],
            l: array[3],
            g: array[4],
            t: array[5],
            b: "0"
        }

        axios.post('https://jhu-course-rating-api.herokuapp.com/courses/add-review/'+this.props.match.params.id+"/"+this.state.uid, obj)
        // axios.post('http://localhost:4000/courses/add-review/'+this.props.match.params.id+"/"+this.state.uid, obj)
            .then(function(res) {
                window.location.reload()
            })
            .catch(function (error) {
            })
        this.props.history.push('/page-'+this.props.match.params.page)
    }

    render() {
        return (<>
            <Header active="sp20" />
            <div className="site-container">
                {!this.state.isSignedIn && 
                    <Login uiconfig={this.state.uiConfig} firebaseauth={firebase.auth()} />
                }
                {this.state.isSignedIn && 
                    <div style={{paddingTop:"20px", paddingBottom:"30px"}}>
                        <div style={{paddingBottom:"15px"}}>
                            <h2>You are submitting a review for:</h2>
                            <h5 style={{color:"#6c757d"}}>{this.state.number} {this.state.title}</h5>
                        </div>
                        <FormComponent
                            page={this.props.match.params.page}
                            changeText={this.changeText} 
                            changeWorkload={this.changeWorkload}
                            changeDifficulty={this.changeDifficulty}
                            changeGrading={this.changeGrading}
                            changeLearning={this.changeLearning}
                            changeInstructorQuality={this.changeInstructorQuality}
                            changeSemester={this.changeSemester}
                            changeInstructorName={this.changeInstructorName}
                            onSubmit={this.onSubmit}
                        />
                    </div>
                }   
            </div>
        </>)    
    }

    changeInstructorName(e) {
        this.setState({
            instructor_name: e.target.value.trim()
        });
    }

    changeSemester(e) {
        var value = e.target.value
        if (value === "Spring 2020" || value === "") {
            value = "S20"
        } else if (value === "Fall 2019") {
            value = "F19"
        } else if (value === "Spring 2019") {
            value = "S19"
        } else if (value === "Fall 2018") {
            value = "F18"
        } else if (value === "Spring 2018") {
            value = "S18"
        }
        alert(value)
        this.setState({
            semester: value
        });
    }

    changeText(e) {
        this.setState({
            text: e.target.value.trim()
        });
    }

    changeWorkload(e) {
        this.setState({
            workload: e.target.value
        });
    }

    changeDifficulty(e) {
        this.setState({
            difficulty: e.target.value
        });
    }

    changeLearning(e) {
        this.setState({
            learning: e.target.value
        });
    }

    changeGrading(e) {
        this.setState({
            grading: e.target.value
        });
    }

    changeInstructorQuality(e) {
        this.setState({
            instructor_quality: e.target.value
        });
    }
}

function FormComponent(props) { 
    const [validated, setValidated] = useState(false);
    const page = props.page

    const handleCancel = () => {
        history.push('/page-'+page)
    }
  
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        if (form.checkValidity()) {
            props.onSubmit(event)
        }
    };
  
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} controlId="validationCustomUsername">
                    <Form.Label>
                        Semester
                    </Form.Label>
                    <InputGroup>
                        <Form.Control as="select" defaultValue="Spring 2020" required onChange={props.changeSemester}>
                            <option>Spring 2018</option>
                            <option>Fall 2018</option>
                            <option>Spring 2019</option>
                            <option>Fall 2019</option>
                            <option>Spring 2020</option>
                        </Form.Control> 
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col}  controlId="validationCustom05">
                    <Form.Label>
                        Instructor Name
                    </Form.Label>
                    <Form.Control 
                        as="textarea" 
                        placeholder="Type your instructor's name" 
                        rows="1" 
                        required
                        maxLength={50}
                        onChange={props.changeInstructorName}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide your instructor's name.
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="validationCustomUsername">
                    <Form.Label>
                        <Popover name="Workload" title="Workload" scaleOne="1 = Enough work for 3 classes" scaleTwo="5 = A whole lot of nothing" />
                    </Form.Label>
                    <InputGroup>
                        <Form.Control as="select" defaultValue="3" required onChange={props.changeWorkload}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col}  controlId="validationCustomUsername">
                    <Form.Label>
                        <Popover name="Difficulty" title="Difficulty" scaleOne="1 = Were the lectures in English??" scaleTwo="5 = Me and all my bois aced it" />
                    </Form.Label>
                    <InputGroup>
                        <Form.Control as="select" defaultValue="3" required onChange={props.changeDifficulty}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustomUsername">
                    <Form.Label>
                        <Popover name="Grading" title="Grading" scaleOne="1 = Prof had no mercy on my soul" scaleTwo="5 = Was it possible to not get an A??" />
                    </Form.Label>
                    <InputGroup>
                        <Form.Control as="select" defaultValue="3" required onChange={props.changeGrading}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="validationCustomUsername">
                        <Form.Label>
                            <Popover name="Learning" title="Learning" scaleOne="1 = I only have two brain cells left" scaleTwo="5 = I'm a big 200iq brain now" />
                        </Form.Label>
                        <InputGroup>
                            <Form.Control as="select" defaultValue="3" required onChange={props.changeLearning}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="validationCustomUsername">
                        <Form.Label>
                            <Popover name="Instructor Quality" title="Instructor Quality" scaleOne="1 = I had to completely self-teach" scaleTwo="5 = The prof was basically God" />
                        </Form.Label>
                        <InputGroup>
                            <Form.Control as="select" defaultValue="3" required onChange={props.changeInstructorQuality}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col}  controlId="validationCustom05">
                    <Form.Label>
                        Review
                    </Form.Label>
                    <Form.Control 
                        as="textarea" 
                        placeholder="Type your thoughts about the course..." 
                        rows="3" 
                        required
                        maxLength={550}
                        onChange={props.changeText}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a review.
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Button type="submit">Submit</Button>

            <Link to={"/page-"+page}>
                <Button variant="danger" onClick={handleCancel} type="cancel" style={{marginLeft:"15px"}}>Cancel</Button>
            </Link>
        </Form>
    );
}