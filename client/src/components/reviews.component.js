import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Card, Badge, Button } from 'react-bootstrap';

class Review extends Component {
    render() {
        return (<>
            <Card style={{backgroundColor: "#f8f9fa", marginTop: "10px", marginBottom: "10px"}}>
                <Card.Body style={{paddingTop: "15px", paddingBottom: "0px"}}>
                    <p>{this.props.review.text}</p>
                </Card.Body>
            </Card>
        </>)
    }
}

export default class Reviews extends Component {
    stats() {
        const props = this.props
        var ratings = [0, 0, 0, 0, 0]
        var variants = ["success", "success", "success", "success", "success"]
        for (var i = 0; i < props.course.reviews.length; i++) {
            ratings[0] += Number(props.course.reviews[i].workload)
            ratings[1] += Number(props.course.reviews[i].difficulty)
            ratings[2] += Number(props.course.reviews[i].grade_leniency)
            ratings[3] += Number(props.course.reviews[i].learn_quality)
            ratings[4] += Number(props.course.reviews[i].teacher_quality)
        }
        for (i = 0; i < ratings.length; i++) {
            ratings[i] /= props.course.reviews.length
            ratings[i] = Number(ratings[i]).toPrecision(3)
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

    render() {
        const props = this.props
        var course = props.course
        var page = props.page
        if (props.course.reviews.length > 0) {
            return (<>
                <h4>Average Stats</h4>
                { this.stats() }  

                <div className="flex-wrapper">
                    <h4 style={{paddingTop: "15px"}}>Reviews</h4>
                    <div>
                        <Link to={"/submit-review/"+course._id+"/"+page}>
                            <Button variant="outline-primary" size="sm" style={{marginTop: "16px", marginLeft:"10px"}}>Submit a Review</Button>
                        </Link> 
                    </div>
                </div>
                <div>
                    {props.course.reviews.map((review, key) =>
                        <Review review={review} key={key} />
                    )}
                </div>
            </>)
        }
        // no reviews yet, display prompt to submit first review 
        return (<>
                <h2 style={{paddingTop: "5px"}}>Reviews</h2>
                <div className="flex-wrapper">
                    <p>No one has reviewed this course yet. Be the first!</p>
                    <Link to={"/submit-review/"+course._id+"/"+page}>
                        <Button variant="outline-primary" size="sm" style={{marginTop: "-5px", marginLeft: "10px"}} >Submit a Review</Button>
                    </Link>
                </div>
        </>)
    }

}