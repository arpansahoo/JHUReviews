import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';

import PaginationComponent from './PaginationComponent';
import Popover from '../popover.component';
import SearchFilter from './SearchFilter';
import Header from '../header.component';
import history from '../../history';
import Course from './Course';

const mean = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i += 1) {
    sum += array[i];
  }
  return sum / array.length;
};

const calculateMeanCourseStats = (courses) => {
  courses.forEach((currentCourse) => {
    const overallQualityRatings = [];
    const workloadRatings = [];
    const difficultyRatings = [];
    const gradingRatings = [];
    const learningRatings = [];
    const teacherRatings = [];

    currentCourse.rev.forEach((review) => {
      // Old review (from pdf) which only contains overall quality rating
      if (review.b === '1') {
        // Old reviews are worth 5 new reviews
        for (let j = 0; j < 5; j += 1) {
          overallQualityRatings.push(Number.parseFloat(review.w));
        }
        // New review
      } else if (Number.parseFloat(review.b) === '0') {
        workloadRatings.append(Number.parseFloat(review.w));
        difficultyRatings.append(Number.parseFloat(review.d));
        gradingRatings.append(Number.parseFloat(review.g));
        learningRatings.append(Number.parseFloat(review.l));
        teacherRatings.append(Number.parseFloat(review.t));
      }
    });

    currentCourse.overallQuality = mean(overallQualityRatings);
    currentCourse.workload = mean(workloadRatings);
    currentCourse.difficulty = mean(difficultyRatings);
    currentCourse.grading = mean(gradingRatings);
    currentCourse.learning = mean(learningRatings);
    currentCourse.teacherRating = mean(teacherRatings);
  });
};


export default class CourseList extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.updateSearchFilters = this.updateSearchFilters.bind(this);

    const filters = {
      courseName: '',
      instructorName: '',
      includeHumanitiesAreaDesignation: true,
      includeSocialSciencesAreaDesignation: true,
      includeNaturalSciencesAreaDesignation: true,
      includeEngineeringAreaDesignation: true,
      includeQuantitativeAreaDesignation: true,
      includeCoursesWithoutAreaDesignation: true,
      writingIntensive: false,
      offeredInFall2020: false
    };

    if (localStorage.getItem('course') !== null) { filters.courseName = localStorage.getItem('course'); }
    if (localStorage.getItem('instructor') !== null) { filters.instructorName = localStorage.getItem('instructor'); }
    if (localStorage.getItem('h') !== null) { filters.includeHumanitiesAreaDesignation = JSON.parse(localStorage.getItem('h')); }
    if (localStorage.getItem('s') !== null) { filters.includeSocialSciencesAreaDesignation = JSON.parse(localStorage.getItem('s')); }
    if (localStorage.getItem('n') !== null) { filters.includeNaturalSciencesAreaDesignation = JSON.parse(localStorage.getItem('n')); }
    if (localStorage.getItem('e') !== null) { filters.includeEngineeringAreaDesignation = JSON.parse(localStorage.getItem('e')); }
    if (localStorage.getItem('q') !== null) { filters.includeQuantitativeAreaDesignation = JSON.parse(localStorage.getItem('q')); }
    if (localStorage.getItem('na') !== null) { filters.includeCoursesWithoutAreaDesignation = JSON.parse(localStorage.getItem('na')); }
    if (localStorage.getItem('w') !== null) { filters.writingIntensive = JSON.parse(localStorage.getItem('w')); }
    if (localStorage.getItem('offered') !== null) { filters.offeredInFall2020 = JSON.parse(localStorage.getItem('offered')); }


    let active = 1;
    if (this.props.match != null && this.props.match.params != null) {
      const num = this.props.match.params.active;
      try {
        if (JSON.parse(num) > 0) { active = JSON.parse(num); }
      } catch (e) {}
    }
    if (active > 1) {
      if (localStorage.getItem('courses-length') != null) {
        if ((active - 1) * 50 > JSON.parse(localStorage.getItem('courses-length'))) {
          active = Math.ceil(JSON.parse(localStorage.getItem('courses-length')) / 50);
        }
      } else if ((active - 1) * 50 > 2481) { active = 50; }
    }

    if (active > 1) {
      history.push(`/page-${active}`);
    } else {
      history.push('/');
    }

    let courses = [];
    try {
      courses = JSON.parse(localStorage.getItem('courses'));
    } catch (e) {}

    this.state = {
      courses,
      active,
      loading: true,
      filters,
    };
  }

  componentDidMount() {
    const url = 'https://jhu-course-rating-api.herokuapp.com/courses/1-20';
    const url2 = 'https://jhu-course-rating-api.herokuapp.com/courses';
    // const url = 'http://localhost:4000/courses/1-20';
    // const url2 = 'http://localhost:4000/courses';

    if (true) { // this.state.courses.length === 0) {
      this.setState({
        loading: true,
      });

      axios.get(url2)
        .then((response) => {
          const courses = response.data;
          calculateMeanCourseStats(courses);

          localStorage.setItem('courses', JSON.stringify(response.data));

          this.setState({
            courses,
            loading: false
          });
        });
    }
  }

  changePage(num) {
    this.setState({ active: num });
    if (num > 1) {
      history.push(`/page-${num}`);
    } else {
      history.push('/');
    }
  }

  updateSearchFilters(options) {
    const { filters } = this.state;

    if (options.courseName !== undefined) {
      filters.courseName = options.courseName;
      localStorage.setItem('course', filters.courseName);
    }

    if (options.offeredInFall2020 !== undefined) {
      filters.offeredInFall2020 = options.offeredInFall2020;
      localStorage.setItem('offered', filters.offeredInFall2020);
    }

    if (options.instructorName !== undefined) {
      filters.instructorName = options.instructorName;
      localStorage.setItem('instructor', filters.instructorName);
    }

    if (options.writingIntensive !== undefined) {
      filters.writingIntensive = options.writingIntensive;
      localStorage.setItem('w', filters.writingIntensive);
    }

    if (options.includeCoursesWithoutAreaDesignation !== undefined) {
      filters.includeCoursesWithoutAreaDesignation = options.includeCoursesWithoutAreaDesignation;
      localStorage.setItem('na', filters.includeCoursesWithoutAreaDesignation);
    }

    if (options.includeHumanitiesAreaDesignation !== undefined) {
      filters.includeHumanitiesAreaDesignation = options.includeHumanitiesAreaDesignation;
      localStorage.setItem('h', filters.includeHumanitiesAreaDesignation);
    }

    if (options.includeSocialSciencesAreaDesignation !== undefined) {
      filters.includeSocialSciencesAreaDesignation = options.includeSocialSciencesAreaDesignation;
      localStorage.setItem('s', filters.includeSocialSciencesAreaDesignation);
    }

    if (options.includeNaturalSciencesAreaDesignation !== undefined) {
      filters.includeNaturalSciencesAreaDesignation = options.includeNaturalSciencesAreaDesignation;
      localStorage.setItem('n', filters.includeNaturalSciencesAreaDesignation);
    }

    if (options.includeEngineeringAreaDesignation !== undefined) {
      filters.includeEngineeringAreaDesignation = options.includeEngineeringAreaDesignation;
      localStorage.setItem('e', filters.includeEngineeringAreaDesignation);
    }

    if (options.includeQuantitativeAreaDesignation !== undefined) {
      filters.includeQuantitativeAreaDesignation = options.includeQuantitativeAreaDesignation;
      localStorage.setItem('q', filters.includeQuantitativeAreaDesignation);
    }

    this.setState({
      active: 1,
      filters
    });
    history.push('/');
  }

  search = (courseDatabase, filters) => {
    // First filter courses by tags and designations
    let courses = courseDatabase.filter((currentCourse) => {
      const areas = currentCourse.a.toUpperCase();

      let valid = (filters.includeHumanitiesAreaDesignation && areas.includes('H'))
               || (filters.includeSocialSciencesAreaDesignation && areas.includes('S'))
               || (filters.includeNaturalSciencesAreaDesignation && areas.includes('N'))
               || (filters.includeEngineeringAreaDesignation && areas.includes('E'))
               || (filters.includeQuantitativeAreaDesignation && areas.includes('Q'))
               || (filters.includeCoursesWithoutAreaDesignation && areas === 'N/A');

      if (filters.writingIntensive && currentCourse.w === 'N') { valid = false; }
      if (filters.offeredInFall2020 && currentCourse.o === '0') { valid = false; }

      return valid;
    });

    // Then filter and rank courses by fuzzy search on instructor name if given
    const instructorName = filters.instructorName.toLowerCase().trim();
    if (instructorName) {
      const options = {
        isCaseSensitive: false,
        includeScore: false,
        shouldSort: true,
        includeMatches: false,
        findAllMatches: false,
        minMatchCharLength: 1,
        location: 0,
        threshold: 0.3,
        distance: 100,
        useExtendedSearch: false,
        keys: ['i']
      };

      const fuse = new Fuse(courses, options);
      courses = fuse.search(instructorName);
    }

    // Finally filter and rank courses by courseName (if given)
    let courseName = filters.courseName.trim().toLowerCase();
    if (!courseName) {
      return courses;
    }
    // some naive hardcoding for common abbreviations
    courseName = courseName.replace('orgo', 'organic');
    courseName = courseName.replace('stats', 'statistics');
    courseName = courseName.replace('ifp', 'fiction/poetry');
    if (courseName === 'bbc') { courseName = 'brain, behavior, and cognition'; }
    if (courseName === 'csf') { courseName = 'computer system fundamentals'; }

    // Filter to keep only matching courses
    const queryKeywords = courseName.split(' ');
    courses = courses.filter((currentCourse) =>
      // Every keyword in search query must appear as a substring of course name or number
      queryKeywords.every((keyword) => {
        const matchesCourseName = currentCourse.n.trim().toLowerCase().includes(keyword);
        const matchesCourseNum = currentCourse.num.toLowerCase().includes(keyword);
        return matchesCourseName || matchesCourseNum;
      }));

    // Then sort by length of course name so longer course titles with more words
    // that match more queries will be put lower
    courses.sort((c1, c2) => c1.n.length - c2.n.length);

    return courses;
  }

  render() {
    const { active, courses, filters } = this.state;

    const matchingCourses = this.search(courses, filters);
    const visibleCourses = matchingCourses.slice((active - 1) * 50, (active * 50));

    localStorage.setItem('courses-length', matchingCourses.length);

    return (
      <>
        <Header loading={this.state.loading} />
        <br />
        <div className="site-container">
          <div>
            <div>
              <SearchFilter
                filters={filters}
                updateSearchFilters={this.updateSearchFilters}
              />
            </div>
            <div className="flex-wrapper" style={{ float: 'right' }}>
              <PaginationComponent page={active} changePage={this.changePage} length={matchingCourses.length} />
            </div>
          </div>
          <table className="table table-responsive" style={{ marginTop: 20 }}>
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
              {visibleCourses.map((currentCourse, i) => <Course course={currentCourse} active={active} key={`course-${active * 50 + i}`} />)}
            </tbody>
          </table>
          <div className="flex-wrapper" style={{ float: 'right' }}>
            <PaginationComponent page={active} changePage={this.changePage} length={matchingCourses.length} />
          </div>
        </div>
      </>
    );
  }
}
