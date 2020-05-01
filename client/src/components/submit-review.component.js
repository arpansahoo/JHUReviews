import React, { Component, useState } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, InputGroup, Col } from 'react-bootstrap';
import Popover from "./popover.component";
import history from "../history";
import Header from "./header.component";

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
                        <Popover name="Workload" title="Workload" scaleOne="1 = enough work for 3 classes" scaleTwo="5 = a whole lot of nothing" />
                    </Form.Label>
                    <InputGroup>
                        <Form.Control as="select" defaultValue="3" required onChange={props.changeWL}>
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
                        <Popover name="Difficulty" title="Difficulty" scaleOne="1 = were the lectures in English??" scaleTwo="5 = me and all my bois aced it" />
                    </Form.Label>
                    <InputGroup>
                        <Form.Control as="select" defaultValue="3" required onChange={props.changeDiff}>
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
                        <Popover name="Grading" title="Grading" scaleOne="1 = grammar Nazi" scaleTwo="5 = was it possible to not get an A??" />
                    </Form.Label>
                    <InputGroup>
                        <Form.Control as="select" defaultValue="3" required onChange={props.changeGL}>
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
                            <Popover name="Learning" title="Learning" scaleOne="1 = on my last two brain cells" scaleTwo="5 = i'm a big 200iq brain now" />
                        </Form.Label>
                        <InputGroup>
                            <Form.Control as="select" defaultValue="3" required onChange={props.changeLE}>
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
                            <Popover name="Instructor Quality" title="Instructor Quality" scaleOne="1 = i had to completely self-teach" scaleTwo="5 = the prof was basically God" />
                        </Form.Label>
                        <InputGroup>
                            <Form.Control as="select" defaultValue="3" required onChange={props.changeIQ}>
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
                        Please provide a valid review.
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

export default class ReviewForm extends Component {
    constructor(props) {
        super(props);

        this.changeText = this.changeText.bind(this);
        this.changeWL = this.changeWL.bind(this);
        this.changeDiff = this.changeDiff.bind(this);
        this.changeLE = this.changeLE.bind(this);
        this.changeGL = this.changeGL.bind(this);
        this.changeIQ = this.changeIQ.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            number: '',
            title: '',
            instructor: '',
            reviews: [],
            text: '',
            workload: '',
            difficulty: '',
            learn_quality: '',
            teacher_quality: '',
            grade_leniency: ''
        }
    }

    componentDidMount() {
        axios.get('https://jhu-course-rating-api.herokuapp.com/courses/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    number: response.data.number,
                    title: response.data.name,
                    instructor: response.data.instructor, 
                    reviews: response.data.reviews
                })   
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    onSubmit(e) {
        e.preventDefault()
        var array = [this.state.text, this.state.workload, this.state.difficulty, this.state.learn_quality, this.state.grade_leniency, this.state.teacher_quality]
        for (let i = 0; i < array.length; i++) {
            if ("" === array[i])
                array[i] = "3.00"
        }
        
        const obj = {
            text: array[0],
            workload: array[1],
            difficulty: array[2],
            learn_quality: array[3],
            grade_leniency: array[4],
            teacher_quality: array[5],
            userID: localStorage.getItem('userID')
        }

        var allowed = true
        try {
            for (let i = 0; i < this.state.reviews.length; i++) {
                if (this.state.reviews[i].userID === localStorage.getItem('userID')) {
                    allowed = false
                    break
                }
            }
        } catch(e) {
            allowed = false
        }

        if (obj.userID == null) 
            allowed = false

        if (allowed) {
            axios.post('https://jhu-course-rating-api.herokuapp.com/courses/add-review/'+this.props.match.params.id, obj)
                .then(
                    res => console.log(res.data)
                )
            this.props.history.push('/page-1');  
        } else {
            this.props.history.push('/page-'+this.props.match.params.page);  
            alert("You have already reviewed this course. New submission was not posted.")
        }
    }

    render() {
        return (<>
            <Header active="sp20" />
            <div className="site-container">
                <div style={{paddingTop:"20px", paddingBottom:"30px"}}>
                    <div style={{paddingBottom:"15px"}}>
                        <h2>You are submitting a review for:</h2>
                        <h5 style={{color:"#6c757d"}}>{this.state.number} {this.state.title}</h5>
                    </div>
                    <FormComponent
                        page={this.props.match.params.page}
                        changeText={this.changeText} 
                        changeWL={this.changeWL}
                        changeDiff={this.changeDiff}
                        changeGL={this.changeGL}
                        changeLE={this.changeLE}
                        changeIQ={this.changeIQ}
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        </>)
    }

    changeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    changeWL(e) {
        this.setState({
            workload: e.target.value
        });
    }

    changeDiff(e) {
        this.setState({
            difficulty: e.target.value
        });
    }

    changeLE(e) {
        this.setState({
            learn_quality: e.target.value
        });
    }

    changeGL(e) {
        this.setState({
            grade_leniency: e.target.value
        });
    }

    changeIQ(e) {
        this.setState({
            teacher_quality: e.target.value
        });
    }
}