import React, { Component } from 'react';
import axios from 'axios';
import history from "../history";
import { Button, Badge } from 'react-bootstrap';
import Reviews from "./reviews.component";
import PaginationComponent from "./pagination.component";
import Popover from "./popover.component";
import Filter from "./filter.component";
import Header from "./header.component";
import Fuse from 'fuse.js';

class Course extends Component {
    constructor(props) {
        super(props)
        this.state = {open: false}
    }

    handleClick(bool) {
        this.setState({open: bool})  
    }

    render() {
        const props = this.props
        var rating = props.course.rating
        var color = "dark"
        if (rating < 1) {
            color = "dark"
        } else if (rating < 3) {
            color = "danger"
        } else if (rating < 4) {
            color = "warning"
        } else {
            color = "success"
        }

        return (<>
            <tr className="hover" onClick={() => this.handleClick(!this.state.open)} >
                <td>{props.course.num}</td>
                <td>
                    <div className="row" style={{paddingLeft: "17px"}}>
                        <div style={{paddingRight: "5px"}}>
                            {props.course.n}
                        </div>
                        {(this.state.open) &&
                            <Button variant="link" style={{padding:"0"}} onClick={() => this.handleClick(false)}>
                                <p style={{margin: "0", marginTop: "-2px"}}>[-]</p>
                            </Button>           
                        }
                        {(!this.state.open) &&
                            <Button variant="link" style={{padding:"0"}} onClick={() => this.handleClick(true)}>
                                <p style={{margin: "0", marginTop: "-2px"}}>[+]</p>
                            </Button>      
                        }
                    </div>
                </td>
                <td style={{paddingLeft: "14px"}}>{props.course.a}</td>
                <td style={{paddingLeft: "15px"}}>{props.course.w}</td>
                <td style={{paddingLeft: "15px"}}>{props.course.c}</td>
                <td style={{paddingLeft: "15px"}}><Badge variant={color} style={{fontSize: "15px", padding: "5px", fontWeight: "400"}}>{props.course.rating}</Badge></td>
            </tr>
            {(this.state.open) &&
                <tr>
                    <td colSpan="100%">
                        <div>
                            <Reviews history={history} course={props.course} page={props.active} key={props._id} ratings={props.course.ratings} />
                        </div>
                    </td>
                </tr>
            }
        </>);
    }
}

export default class CourseList extends Component {
    constructor(props) {
        super(props)
        this.changePage = this.changePage.bind(this)
        this.filterCourse = this.filterCourse.bind(this)
        this.filterInstructor = this.filterInstructor.bind(this)
        this.filterW = this.filterW.bind(this)
        this.filterH = this.filterH.bind(this)
        this.filterS = this.filterS.bind(this)
        this.filterN = this.filterN.bind(this)
        this.filterE = this.filterE.bind(this)
        this.filterQ = this.filterQ.bind(this)
        this.filterNA = this.filterNA.bind(this)
        this.filterRating = this.filterRating.bind(this)
        this.filterOffered = this.filterOffered.bind(this)

        var filters = ['',false,'',false, true, true, true, true, true, false, '']
        if (localStorage.getItem('course') !== null) 
            filters[0] = localStorage.getItem('course')
        if (localStorage.getItem('offered') !== null) 
            filters[1] = JSON.parse(localStorage.getItem('offered'))
        if (localStorage.getItem('instructor') !== null) 
            filters[2] = localStorage.getItem('instructor')
        if (localStorage.getItem('rating') !== null) 
            filters[10] = localStorage.getItem('rating')
        if (localStorage.getItem('w') !== null) 
            filters[3] = JSON.parse(localStorage.getItem('w'))
        if (localStorage.getItem('h') !== null) 
            filters[4] = JSON.parse(localStorage.getItem('h'))
        if (localStorage.getItem('s') !== null) 
            filters[5] = JSON.parse(localStorage.getItem('s'))
        if (localStorage.getItem('n') !== null) 
            filters[6] = JSON.parse(localStorage.getItem('n'))
        if (localStorage.getItem('e') !== null) 
            filters[7] = JSON.parse(localStorage.getItem('e'))
        if (localStorage.getItem('q') !== null) 
            filters[8] = JSON.parse(localStorage.getItem('q'))
        if (localStorage.getItem('na') !== null) 
            filters[9] = JSON.parse(localStorage.getItem('na'))


        var active = 1;
        if (this.props.match != null && this.props.match.params != null) {
            const num = this.props.match.params.active
            try {
                if (JSON.parse(num) > 0)
                    active = JSON.parse(num)
            } catch(e) {}
        }
        if (active > 1) {
            if (localStorage.getItem('courses-length') != null) {
                if ((active - 1) * 50 > JSON.parse(localStorage.getItem('courses-length'))) 
                    active = Math.ceil(JSON.parse(localStorage.getItem('courses-length')) / 50) 
            } else {
                if ((active - 1) * 50 > 2481) 
                    active = 50 
            }
        }
        if (active <= 0)
            active = 1
        history.push('/page-'+active)

        var courses = null
        try {
            courses = JSON.parse(localStorage.getItem('courses'))
        } catch(e) {}
        if (courses === null) 
            courses = []

        this.state = {
            courses: courses, 
            active: active, 
            loading: true, 
            filters: filters, 
        }
    }

    componentDidMount() {
        const url = "https://jhu-course-rating-api.herokuapp.com/courses/1-20"  
        const url2 = "https://jhu-course-rating-api.herokuapp.com/courses"  
        // const url = 'http://localhost:4000/courses/1-20'
        // const url2 = 'http://localhost:4000/courses'
        this.setState({
            loading: true,
        })
        if (this.state.courses.length === 0) {
            axios.get(url)        
                .then(response => {
                    this.setState({
                        courses: response.data, 
                    })
                    axios.get(url2)        
                        .then(response => {
                            localStorage.setItem('courses', JSON.stringify(response.data))
                            this.setState({
                                courses: response.data, 
                                loading: false
                            })
                        })
                        .catch(function(error) {
                        })
                })
                .catch(function(error) {
                })
        } else {
            axios.get(url2)        
                .then(response => {
                    localStorage.setItem('courses', JSON.stringify(response.data))
                    this.setState({
                        courses: response.data, 
                        loading: false
                    })
                })
                .catch(function(error) {
                    console.log(error)
                })
        }
    }

    changePage(num) {
        this.setState({active: num})
        history.push('/page-'+num)
    }

    courseList(courses) {
        const active = this.state.active
        return (
            courses.slice((active - 1) * 50, (active * 50)).map(function(currentCourse, i) {
                return (<Course course={currentCourse} active={active} key={i + active * Math.random(100)} />);
            })
        );
    }
 
    render() {
        const active = this.state.active
        var courses = []
        const filters = this.state.filters
        var minRating = 0
        try {
            minRating = JSON.parse(filters[10])
        } catch(e) {}

        this.state.courses.map(function(currentCourse, i) {
            var ratings = [0, 0, 0, 0, 0]
            var oldRatings = [0, 0, 0, 0, 0]
            var newRatings = [0, 0, 0, 0, 0]
            var oldLen = 0
            var newLen = 0

            for (var j = 0; j < currentCourse.rev.length; j++) {
                if (Number.parseFloat(currentCourse.rev[j].b) === 1) { // old reviews
                    oldRatings[0] += Number.parseFloat(currentCourse.rev[j].w)
                    oldRatings[1] += Number.parseFloat(currentCourse.rev[j].d)
                    oldRatings[2] += Number.parseFloat(currentCourse.rev[j].g)
                    oldRatings[3] += Number.parseFloat(currentCourse.rev[j].l)
                    oldRatings[4] += Number.parseFloat(currentCourse.rev[j].t)
                    oldLen++
                } else if (Number.parseFloat(currentCourse.rev[j].b) === 0) { // new reviews
                    newRatings[0] += Number.parseFloat(currentCourse.rev[j].w)
                    newRatings[1] += Number.parseFloat(currentCourse.rev[j].d)
                    newRatings[2] += Number.parseFloat(currentCourse.rev[j].g)
                    newRatings[3] += Number.parseFloat(currentCourse.rev[j].l)
                    newRatings[4] += Number.parseFloat(currentCourse.rev[j].t)
                    newLen++
                }
            }
            var rating = 0.0
            for (j = 0; j < ratings.length; j++) {
                if (newLen === 0 && oldLen > 0) 
                    ratings[j] = oldRatings[j] / oldLen
                    rating += ratings[j]
                    ratings[j] = Number(ratings[j]).toPrecision(3)
                if (newLen > 0) {
                    ratings[j] = (oldRatings[j] + (newRatings[j] / newLen)) / (oldLen + 1)
                    rating += ratings[j]
                    ratings[j] = Number(ratings[j]).toPrecision(3)
                }
            }
            rating /= 5
            rating = Number(rating).toPrecision(3)
            currentCourse.rating = rating
            currentCourse.ratings = ratings

            var valid = rating >= minRating
            
            if (valid && filters[3] && currentCourse.w === "N")
                valid = false 
            if (valid && filters[9] && currentCourse.a === "N/A")
                valid = false
            if (valid && filters[1] && currentCourse.o === "0")
                valid = false

            if (valid) {
                const areas = currentCourse.a.toUpperCase()
                const chars = ['0','1','2','3','H','S','N','E','Q']
                var count = 0

                for (j = 4; j < filters.length; j++) {
                    if (filters[j]) {
                        if (areas.includes(chars[j])) {
                            count++
                            break
                        }
                    }
                }
                if (count === 0)
                    valid = false
                if (areas.includes("N/A"))
                    valid = true
            }

            if (valid) {
                currentCourse.abbreviation = currentCourse.n.replace("Introductory ", "Intro ")
                currentCourse.abbreviation = currentCourse.n.replace("Introduction ", "Intro ")
                courses.push(currentCourse)
            }
            return 0
        })

        // Fuse.js for fuzzy search
        var pattern = filters[0].toLowerCase().trim()
        var pattern2 = filters[2].toLowerCase().trim()

        if (pattern.length > 0 || pattern2.length > 0) {
            var fuzzy = courses
            const options = {
                isCaseSensitive: false,
                includeScore: false,
                shouldSort: true,
                includeMatches: false,
                findAllMatches: false,
                minMatchCharLength: 1,
                location: 0,
                threshold: 0.4,
                distance: 100,
                useExtendedSearch: false,
                keys: [
                    "n",
                    "num",
                    "d",
                    "abbreviation"
                ]
            };

            const fuse = new Fuse(fuzzy, options);
            if (pattern.length > 0)  {
                // some naive hardcoding for common abbreviations
                pattern = pattern.replace("intro orgo", "introductory organic")
                pattern = pattern.replace("intro organic", "introductory organic")
                pattern = pattern.replace("intro chem", "introductory chemistry")
                pattern = pattern.replace("gen ", "general ")
                pattern = pattern.replace("orgo ", "organic ")
                pattern = pattern.replace("calc ", "calculus ")
                pattern = pattern.replace("cog ", "cognitive ")
                pattern = pattern.replace("neuro ", "neuroscience ")
                if (!pattern.includes("probability"))
                    pattern = pattern.replace("prob", "probability")
                if (!pattern.includes("statistic"))
                    pattern = pattern.replace("stat", "statistic")
                pattern = pattern.replace("lin ", "linear ")
                pattern = pattern.replace("expos ", "expository ")
                pattern = pattern.replace("ifp", "fiction/poetry")
                pattern = pattern.replace("chem lab", "chemistry laboratory")
                pattern = pattern.replace("bio lab", "biology lab")
                
                if (pattern === "bbc")
                    pattern = "brain, behavior, cognition"
                if (pattern === "orgo")
                    pattern = "organic"
                if (pattern === "calc")
                    pattern = "calculus"
                if (pattern === "csf")
                    pattern = "computer system fundamentals"

                // fuzzy search
                fuzzy = fuse.search(pattern)
            }

            if (pattern2.length > 0 && pattern.length === 0) {
                options.keys = ["i"]; options.threshold = 0.4
                const fuse2 = new Fuse(fuzzy, options);
                fuzzy = fuse2.search(pattern2)
            } else if (pattern2.length > 0) {
                options.keys = ["i"]; options.threshold = 0.4
                var fuzzyClean = []
                for (var j in fuzzy) 
                    fuzzyClean.push(fuzzy[j].item)
                const fuse2 = new Fuse(fuzzyClean, options);
                fuzzy = fuse2.search(pattern2)
            }
            courses = []
            for (j in fuzzy) 
                courses.push(fuzzy[j].item)
        }
        
        localStorage.setItem('courses-length', courses.length)

        return (<>
            <Header loading={this.state.loading} />
            <br/>
            <div className="site-container">
                <div>
                    <div>
                        <Filter 
                            filters={filters} 
                            filterCourse={this.filterCourse}
                            filterName={this.filterName} 
                            filterInstructor={this.filterInstructor}
                            filterW={this.filterW}
                            filterH={this.filterH}
                            filterS={this.filterS}
                            filterN={this.filterN}
                            filterE={this.filterE}
                            filterQ={this.filterQ}
                            filterNA={this.filterNA}
                            filterRating={this.filterRating}
                            filterOffered={this.filterOffered}
                        /> 
                    </div>
                    <div className="flex-wrapper" style={{float:"right"}}>
                        <PaginationComponent page={active} changePage={this.changePage} length={courses.length} />
                    </div>
                </div>
                <table className="table table-responsive" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th className="course-num">Course #</th>
                            <th className="course-name">Course Name</th>
                            <th>Areas</th>
                            <th>Writing</th>
                            <th>Credits</th>
                            <th>
                                <div className="flex-wrapper">
                                    <Popover 
                                        name="Rating"
                                        title="Average Course Rating (out of 5)"
                                        scaleOne="Based on five components: Workload, Difficulty, Grading, Learning, & Instructor Quality"
                                        position="bottom" 
                                    />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.courseList(courses)}
                    </tbody>
                </table>
                <div className="flex-wrapper" style={{float:"right"}}>
                    <PaginationComponent page={active} changePage={this.changePage} length={courses.length} />
                </div>
            </div>
        </>)
    }

    filterCourse(event) {
        var filters = this.state.filters
        filters[0] = event.target.value
        localStorage.setItem('course', filters[0])
        this.setState({
            active: 1,
            filters: filters
        })
        history.push('/page-1')
    }

    filterOffered(event) {
        var filters = this.state.filters
        filters[1] = !filters[1]
        localStorage.setItem('offered', filters[1])
        this.setState({
            active: 1,
            filters: filters
        })
        history.push('/page-1')
    } 

    filterInstructor(event) {
        var filters = this.state.filters
        filters[2] = event.target.value
        localStorage.setItem('instructor', filters[2])
        this.setState({
            active: 1,
            filters: filters
        })
        history.push('/page-1')
    } 

    filterRating(event) {
        var filters = this.state.filters
        filters[10] = event.target.value
        localStorage.setItem('rating', filters[10])
        this.setState({
            active: 1,
            filters: filters
        })
        history.push('/page-1')
    } 

    filterW(event) {
        var filters = this.state.filters
        filters[3] = !filters[3]
        localStorage.setItem('w', filters[3])
        this.setState({
            active: 1,
            filters: filters
        })
        history.push('/page-1')
    } 

    filterNA(event) {
        var filters = this.state.filters
        filters[9] = !filters[9]
        localStorage.setItem('na', filters[9])
        this.setState({
            active: 1,
            filters: filters
        })
        history.push('/page-1')
    } 

    filterH(event) {
        var filters = this.state.filters
        filters[4] = !filters[4]
        localStorage.setItem('h', filters[4])
        this.setState({
            active: 1,
            filters: filters
        })
        history.push('/page-1')
    } 

    filterS(event) {
        var filters = this.state.filters
        filters[5] = !filters[5]
        localStorage.setItem('s', filters[5])
        this.setState({
            active: 1,
            filters: filters
        })
        history.push('/page-1')
    } 

    filterN(event) {
        var filters = this.state.filters
        filters[6] = !filters[6]
        localStorage.setItem('n', filters[6])
        this.setState({
            active: 1,
            filters: filters
        })
        history.push('/page-1')
    } 

    filterE(event) {
        var filters = this.state.filters
        filters[7] = !filters[7]
        localStorage.setItem('e', filters[7])
        this.setState({
            active: 1,
            filters: filters
        })
        history.push('/page-1')
    } 

    filterQ(event) {
        var filters = this.state.filters
        filters[8] = !filters[8]
        localStorage.setItem('q', filters[8])
        this.setState({
            active: 1,
            filters: filters
        })
        history.push('/page-1')
    } 
}
