import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';

import PaginationComponent from './PaginationComponent';
import SearchFilter from './SearchFilter';
import Header from '../header.component';
import { createBrowserHistory } from 'history';
import Course from './Course';

const history = createBrowserHistory();

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
          overallQualityRatings.push(Number.parseFloat(review.w)); // change to .o once we fix data field
        }
        // New review
      } else if (Number.parseFloat(review.b) === '0') {
        overallQualityRatings.push(Number.parseFloat(review.w)); // change to .o once we fix data field
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

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.updateSearchFilters = this.updateSearchFilters.bind(this);

    // Will use urlQueryString values to set filters if present
    // if they are not present, will resort to default
    const urlParams = new URLSearchParams(history.location.search);
    const filters = {
      courseName: urlParams.get('name') || '',
      instructorName: urlParams.get('teacher') || '',
      includeHumanitiesAreaDesignation: urlParams.get('h') !== '0',
      includeSocialSciencesAreaDesignation: urlParams.get('s') !== '0',
      includeNaturalSciencesAreaDesignation: urlParams.get('n') !== '0',
      includeEngineeringAreaDesignation: urlParams.get('e') !== '0',
      includeQuantitativeAreaDesignation: urlParams.get('q') !== '0',
      includeCoursesWithoutAreaDesignation: urlParams.get('na') !== '0',
      writingIntensive: urlParams.get('w') || false,
      offeredInFall2020: urlParams.get('nextSem') || false
    }

    let courses = [];
    try {
      courses = JSON.parse(localStorage.getItem('courses'));
    } catch (e) {}

    this.state = {
      courses,
      activePage: urlParams.get('page') || 1,
      loading: true,
      filters,
    };
  }

  componentDidMount() {
    const url = 'https://jhu-course-rating-api.herokuapp.com/courses';
    // const url= 'http://localhost:4000/courses';

    this.setState({
      loading: true,
    });

    axios.get(url)
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

  changePage(num) {
    this.setState({ activePage: num });

    const urlParams = new URLSearchParams(history.location.search);
    if (num === 1) {
      urlParams.delete('page');
    } else {
      urlParams.set('page', num);
    }
    history.push(`/?${urlParams.toString()}`);
  }

  updateSearchFilters(options) {
    const { filters } = this.state;

    // Using a for in loop here to only view enumerable properties of filters
    for (const prop in options) {
      filters[prop] = options[prop];
    }
    this.setState({ filters });
    this.changePage(1); // Go back to page one

    // Now we update url query string
    const urlParams = new URLSearchParams(history.location.search);
    if (options.courseName !== undefined) {
      urlParams.set('name', options.courseName);
    }
    if (options.instructorName !== undefined) {
      urlParams.set('teacher', options.instructorName);
    }
    if (options.offeredInFall2020 !== undefined) {
      urlParams.set('nextSem', Number(options.offeredInFall2020));
    }
    if (options.writingIntensive !== undefined) {
      urlParams.set('w', Number(options.writingIntensive));
    }
    if (options.includeCoursesWithoutAreaDesignation !== undefined) {
      urlParams.set('na', Number(options.includeCoursesWithoutAreaDesignation));
    }
    if (options.includeHumanitiesAreaDesignation !== undefined) {
      urlParams.set('h', Number(options.includeHumanitiesAreaDesignation));
    }
    if (options.includeSocialSciencesAreaDesignation !== undefined) {
      urlParams.set('s', Number(options.includeSocialSciencesAreaDesignation));
    }
    if (options.includeNaturalSciencesAreaDesignation !== undefined) {
      urlParams.set('n', Number(options.includeNaturalSciencesAreaDesignation));
    }
    if (options.includeEngineeringAreaDesignation !== undefined) {
      urlParams.set('e', Number(options.includeEngineeringAreaDesignation));
    }
    if (options.includeQuantitativeAreaDesignation !== undefined) {
      urlParams.set('q', Number(options.includeQuantitativeAreaDesignation));
    }

    history.push(`/?${urlParams.toString()}`);
  }

  search = (courseDatabase, filters) => {
    // Return empty array if hasn't loaded yet
    if (!courseDatabase) {
      return [];
    }

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

    // Then filter courses by courseName
    let courseName = filters.courseName.trim().toLowerCase();
    if (courseName) {
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
        })
      );
    }

    // Filter and rank courses by fuzzy search on instructor name last since this is slowest
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
      courses = fuse.search(instructorName).map(res => res.item);
    }

    // Then sort by course number so that lower level courses appear first
    courses.sort((c1, c2) => Number(c1.num.slice(-3)) - Number(c2.num.slice(-3)));

    return courses;
  }

  render() {
    const { activePage, courses, filters } = this.state;

    const matchingCourses = this.search(courses, filters);
    const visibleCourses = matchingCourses.slice((activePage - 1) * 50, (activePage * 50));

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
              <PaginationComponent page={activePage} changePage={this.changePage} length={matchingCourses.length} />
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
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {visibleCourses.map((currentCourse, i) => <Course course={currentCourse} activePage={activePage} key={`course-${activePage * 50 + i}`} />)}
            </tbody>
          </table>
          <div className="flex-wrapper" style={{ float: 'right' }}>
            <PaginationComponent page={activePage} changePage={this.changePage} length={matchingCourses.length} />
          </div>
        </div>
      </>
    );
  }
}

export default CourseList;