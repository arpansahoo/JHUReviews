import React, { Component } from 'react';
import axios from 'axios';
import history from "../history";
import { Button, Badge, Spinner } from 'react-bootstrap';
import Reviews from "./reviews.component";
import PaginationComponent from "./pagination.component";
import Popover from "./popover.component";
import Filter from "./filter.component";
import Header from "./header.component";

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
        var rating = Number.parseFloat(props.course.r).toPrecision(3)
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
                {/* <td>{props.course.i}</td> */}
                <td>{props.course.a}</td>
                <td>{props.course.w}</td>
                <td>{props.course.c}</td>
                <td><Badge variant={color} style={{fontSize: "15px", padding: "5px", fontWeight: "400"}}>{rating}</Badge></td>
            </tr>
            {(this.state.open) &&
                <tr>
                    <td colSpan="100%">
                        <div>
                            <Reviews course={props.course} page={props.active} key={props._id} />
                        </div>
                    </td>
                </tr>
            }
        </>);
    }
}

export default class CourseList extends Component {
    interval = null;
    
    constructor(props) {
        super(props)
        this.changePage = this.changePage.bind(this)
        this.filterNum = this.filterNum.bind(this)
        this.filterName = this.filterName.bind(this)
        this.filterInstructor = this.filterInstructor.bind(this)
        this.filterW = this.filterW.bind(this)
        this.filterH = this.filterH.bind(this)
        this.filterS = this.filterS.bind(this)
        this.filterN = this.filterN.bind(this)
        this.filterE = this.filterE.bind(this)
        this.filterQ = this.filterQ.bind(this)
        this.filterNA = this.filterNA.bind(this)
        this.filterRating = this.filterRating.bind(this)

        var filters = ['','','',false, true, true, true, true, true, false, '']
        if (localStorage.getItem('number') !== null) 
            filters[0] = localStorage.getItem('number')
        if (localStorage.getItem('name') !== null) 
            filters[1] = localStorage.getItem('name')
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
                if ((active - 1) * 50 > 2483) 
                    active = 50 
            }
        }
        if (active <= 0)
            active = 1
        history.push('/page-'+active)

        this.state = {
            courses: [], 
            active: active, 
            loading: true, 
            pageLoad: false,
            filters: filters, 
        }
    }

    componentDidMount() {
        //const url = "https://jhu-course-rating-api.herokuapp.com/courses"  
        const url = 'http://localhost:4000/courses'
        this.setState({
            loading: true,
        })
        axios.get(url)        
            .then(response => {
                this.setState({
                    courses: response.data, 
                    loading: false,
                })
            })
            .catch(function(error) {
                console.log(error)
            })
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
        const loading = this.state.loading 
        var courses = []
        const filters = this.state.filters
        const number = filters[0].toUpperCase().trim()
        const name = filters[1].toUpperCase().trim()
        const instructor = filters[2].toUpperCase().trim()
        var rating = 0
        try {
            rating = JSON.parse(filters[10])
        } catch(e) {}

        this.state.courses.map(function(currentCourse, i) {
            var valid = currentCourse.num.includes(number) 
                && currentCourse.n.toUpperCase().includes(name)
                // && currentCourse.instructor.toUpperCase().includes(instructor)
                && currentCourse.r >= rating

            if (valid && filters[3] && currentCourse.w === "N")
                valid = false 
            if (valid && filters[9] && currentCourse.a === "N/A")
                valid = false

            if (valid) {
                const areas = currentCourse.a.toUpperCase()
                const chars = ['0','1','2','3','H','S','N','E','Q']
                var count = 0

                for (var j = 4; j < filters.length; j++) {
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

            if (valid)
                courses.push(currentCourse)
            return 0
        })
        
        localStorage.setItem('courses-length', courses.length)
        return (<>
            <Header active="sp20" />
            <br/>
            <div className="site-container">
                <div>
                    <div>
                        <Filter 
                            filters={filters} 
                            filterNum={this.filterNum}
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
                        /> 
                    </div>
                    <div className="flex-wrapper" style={{float:"right"}}>
                        <Spinner size="sm" variant="primary" style={{marginTop: "13px", marginRight: "10px"}} className={loading ? "":"hidden"} animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        <PaginationComponent page={active} changePage={this.changePage} length={courses.length} />
                    </div>
                </div>
                <table className="table table-responsive" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th className="course-num">Course #</th>
                            <th className="course-name">Course Name</th>
                            {/* <th className="instructor">Instructor(s)</th> */}
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
                    <Spinner size="sm" variant="primary" style={{marginTop: "13px", marginRight: "10px"}} className={loading ? "":"hidden"} animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    <PaginationComponent page={active} changePage={this.changePage} length={courses.length} />
                </div>
            </div>
        </>)
    }

    filterNum(event) {
        var filters = this.state.filters
        filters[0] = event.target.value
        localStorage.setItem('number', filters[0])
        this.setState({
            active: 1,
            filters: filters
        })
        history.push('/page-1')
    }

    filterName(event) {
        var filters = this.state.filters
        filters[1] = event.target.value
        localStorage.setItem('name', filters[1])
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
