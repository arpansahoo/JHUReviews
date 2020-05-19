import React, { Component } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Card, Badge, Button } from 'react-bootstrap';

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
        if (semester === "S20") {
            semester = "Spring 2019"
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
                    <b style={{fontSize:"0.95em"}}>{semester} | Instructor: {this.props.rev.i} | Rating: {this.avg()}</b>
                    <p style={{fontSize:"0.85em"}}>{this.props.rev.c}</p>
                </Card.Body>
            </Card>
        </>)
    }
}

export default class Reviews extends Component {
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

    render() {
        const props = this.props
        var course = props.course
        var page = props.page

        if (props.course.rev.length > 0) {
            return (<>
                <h4>Average Stats</h4>
                { this.stats() }  

                <div className="flex-wrapper">
                    <h4 style={{paddingTop: "15px"}}>Reviews</h4>
                    <div>
                        <Link to={"/submit-review/"+course._id+"/"+page}>
                            <Button variant="outline-primary" size="sm" style={{marginTop: "14.5px", marginLeft:"10px"}}>Submit a Review</Button>
                        </Link> 
                    </div>
                </div>
                <div>
                    {props.course.rev.sort(
                        (a, b) => (this.cmp(a.s, b.s)[0] < this.cmp(a.s)[1]) ? 1 : -1
                    ).map((review, key) =>
                        <Review rev={review} key={key} />
                    )}
                </div>
            </>)
        }
        // no reviews yet, display prompt to submit first review 
        return (<>
                <h4 style={{paddingTop: "5px"}}>Reviews</h4>
                <p>No one has reviewed this course yet. Be the first!</p>
                <Link to={"/submit-review/"+course._id+"/"+page}>
                    <Button variant="outline-primary" size="sm" style={{marginTop: "-5px", marginBottom: "10px"}} >Submit a Review</Button>
                </Link>
        </>)
    }

}