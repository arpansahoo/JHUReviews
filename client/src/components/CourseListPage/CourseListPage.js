import React, { Component } from "react";
import axios from "axios";

import PaginationComponent from "./PaginationComponent";
import SearchFilter from "./SearchFilter";
import SortFilter from "./SortFilter";
import Header from "../header.component";
import Course from "./Course";

const mean = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i += 1) {
    sum += array[i];
  }
  return sum / array.length;
};

const calculateCourseStats = (courses) => {
  courses.forEach((currentCourse) => {
    const overallQualityRatings = [];
    // const workloadRatings = [];
    // const difficultyRatings = [];
    // const gradingRatings = [];
    // const learningRatings = [];
    // const teacherRatings = [];

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
        // workloadRatings.push(Number.parseFloat(review.w));
        // difficultyRatings.push(Number.parseFloat(review.d));
        // gradingRatings.push(Number.parseFloat(review.g));
        // learningRatings.push(Number.parseFloat(review.l));
        // teacherRatings.push(Number.parseFloat(review.t));
      }
    });

    currentCourse.overallQuality = mean(overallQualityRatings);
    // currentCourse.workload = mean(workloadRatings);
    // currentCourse.difficulty = mean(difficultyRatings);
    // currentCourse.grading = mean(gradingRatings);
    // currentCourse.learning = mean(learningRatings);
    // currentCourse.teacherRating = mean(teacherRatings);
  });
};

const CourseListTable = (props) =>
  props.isMobile ? (
    <table className="table">
      <thead>
        <tr>
          <th className="course-name">Course</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {props.visibleCourses.map((currentCourse, i) => (
          <Course
            course={currentCourse}
            activePage={props.activePage}
            key={`course-${currentCourse.num}`}
            isMobile
          />
        ))}
      </tbody>
    </table>
  ) : (
    <table className="table table-responsive">
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
        {props.visibleCourses.map((currentCourse, i) => (
          <Course
            course={currentCourse}
            activePage={props.activePage}
            key={`course-${currentCourse.num}`}
          />
        ))}
      </tbody>
    </table>
  );

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.updateSearchFilters = this.updateSearchFilters.bind(this);

    // Will use urlQueryString values to set filters if present
    // if they are not present, will resort to default
    const urlParams = new URLSearchParams(window.location.search);
    const filters = {
      courseName: urlParams.get("name") || "",
      instructorName: urlParams.get("teacher") || "",
      includeHumanitiesAreaDesignation: urlParams.get("h") !== "0",
      includeSocialSciencesAreaDesignation: urlParams.get("s") !== "0",
      includeNaturalSciencesAreaDesignation: urlParams.get("n") !== "0",
      includeEngineeringAreaDesignation: urlParams.get("e") !== "0",
      includeQuantitativeAreaDesignation: urlParams.get("q") !== "0",
      includeCoursesWithoutAreaDesignation: urlParams.get("na") !== "0",
      writingIntensive: urlParams.get("w") || false,
      offeredNextSem: urlParams.get("nextSem") || false,
      sortBy: Number.parseInt(urlParams.get("sort")) || 0,
    };

    let courses = [];
    try {
      courses = JSON.parse(sessionStorage.getItem("courses"));
    } catch (e) {}

    this.state = {
      courses,
      activePage: Number.parseInt(urlParams.get("page")) || 1,
      loading: true,
      filters,
      resize: false,
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    const url = "https://jhu-course-rating-api.herokuapp.com/courses";
    // const url = 'http://localhost:4000/courses';
    this.setState({
      loading: true,
    });

    axios
      .get(url)
      .then((response) => {
        const courses = response.data;
        calculateCourseStats(courses);
        sessionStorage.setItem("courses", JSON.stringify(courses));
        this.setState({
          courses,
          loading: false,
        });
      })
      .catch((error) => {});
  }

  updateDimensions() {
    if (window.innerWidth < 620) {
      this.setState({ resize: true });
    } else {
      this.setState({ resize: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  changePage(num) {
    this.setState({ activePage: num });

    const urlParams = new URLSearchParams(window.location.search);
    if (num === 1) {
      urlParams.delete("page");
    } else {
      urlParams.set("page", num);
    }
    if (urlParams.toString().length === 0)
      window.history.pushState(null, null, "/");
    else window.history.pushState(null, null, `/?${urlParams.toString()}`);
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
    const urlParams = new URLSearchParams(window.location.search);
    if (options.courseName !== undefined) {
      if (options.courseName.trim().length === 0) urlParams.delete("name");
      else urlParams.set("name", options.courseName.trim());
    }
    if (options.instructorName !== undefined) {
      if (options.instructorName.trim().length === 0)
        urlParams.delete("teacher");
      else urlParams.set("teacher", options.instructorName.trim());
    }
    if (options.offeredNextSem !== undefined) {
      if (!options.offeredNextSem) urlParams.delete("nextSem");
      else urlParams.set("nextSem", Number(options.offeredNextSem));
    }
    if (options.writingIntensive !== undefined) {
      if (!options.writingIntensive) urlParams.delete("w");
      else urlParams.set("w", Number(options.writingIntensive));
    }
    if (options.includeCoursesWithoutAreaDesignation !== undefined) {
      if (options.includeCoursesWithoutAreaDesignation) urlParams.delete("na");
      else
        urlParams.set(
          "na",
          Number(options.includeCoursesWithoutAreaDesignation)
        );
    }
    if (options.includeHumanitiesAreaDesignation !== undefined) {
      if (options.includeHumanitiesAreaDesignation) urlParams.delete("h");
      else urlParams.set("h", Number(options.includeHumanitiesAreaDesignation));
    }
    if (options.includeSocialSciencesAreaDesignation !== undefined) {
      if (options.includeSocialSciencesAreaDesignation) urlParams.delete("s");
      else
        urlParams.set(
          "s",
          Number(options.includeSocialSciencesAreaDesignation)
        );
    }
    if (options.includeNaturalSciencesAreaDesignation !== undefined) {
      if (options.includeNaturalSciencesAreaDesignation) urlParams.delete("n");
      else
        urlParams.set(
          "n",
          Number(options.includeNaturalSciencesAreaDesignation)
        );
    }
    if (options.includeEngineeringAreaDesignation !== undefined) {
      if (options.includeEngineeringAreaDesignation) urlParams.delete("e");
      else
        urlParams.set("e", Number(options.includeEngineeringAreaDesignation));
    }
    if (options.includeQuantitativeAreaDesignation !== undefined) {
      if (options.includeQuantitativeAreaDesignation) urlParams.delete("q");
      else
        urlParams.set("q", Number(options.includeQuantitativeAreaDesignation));
    }
    if (options.sortBy !== undefined) {
      if (options.sortBy === 0) urlParams.delete("sort");
      else urlParams.set("sort", options.sortBy);
    }

    if (urlParams.toString().length === 0)
      window.history.pushState(null, null, "/");
    else window.history.pushState(null, null, `/?${urlParams.toString()}`);
  }

  search = (courseDatabase, filters) => {
    // Return empty array if hasn't loaded yet
    if (!courseDatabase) {
      return [];
    }

    // First filter courses by tags and designations
    let courses = courseDatabase.filter((currentCourse) => {
      const areas = currentCourse.a.toUpperCase();

      let valid =
        (filters.includeHumanitiesAreaDesignation && areas.includes("H")) ||
        (filters.includeSocialSciencesAreaDesignation && areas.includes("S")) ||
        (filters.includeNaturalSciencesAreaDesignation &&
          areas.includes("N")) ||
        (filters.includeEngineeringAreaDesignation && areas.includes("E")) ||
        (filters.includeQuantitativeAreaDesignation && areas.includes("Q")) ||
        (filters.includeCoursesWithoutAreaDesignation && areas === "N/A");

      if (filters.writingIntensive && currentCourse.w === "N") {
        valid = false;
      }
      if (filters.offeredNextSem && currentCourse.o === "0") {
        valid = false;
      }

      return valid;
    });

    // Then filter courses by courseName
    let courseName = filters.courseName.trim().toLowerCase();
    if (courseName) {
      // some naive hardcoding for common abbreviations
      courseName = courseName.replace("orgo", "organic");
      courseName = courseName.replace("stats", "statistics");
      if (courseName === "bbc") {
        courseName = "brain, behavior and cognition";
      }
      if (courseName === "csf") {
        courseName = "computer system fundamentals";
      }

      // Filter to keep only matching courses
      const queryKeywords = courseName.split(" ");
      courses = courses.filter((currentCourse) =>
        // Every keyword in search query must appear as a substring of course name or number
        queryKeywords.every((keyword) => {
          const matchesCourseName = currentCourse.n
            .trim()
            .toLowerCase()
            .includes(keyword);
          const matchesCourseNum = currentCourse.num
            .toLowerCase()
            .includes(keyword);
          // const matchesCourseDept = currentCourse.d && currentCourse.d.toLowerCase().includes(keyword);
          return matchesCourseName || matchesCourseNum;
        })
      );
    }

    // Filter courses by fuzzy search on instructor name
    const instructorName = filters.instructorName.toLowerCase().trim();
    courses.forEach((course) => {
      course.instructorNames = course.i.join(" ");
    });
    if (instructorName) {
      // Filter to keep only matching courses
      const queryKeywords = instructorName.split(" ");
      courses = courses.filter((currentCourse) =>
        // Every keyword in search query must appear as a substring of an instructor name
        queryKeywords.every((keyword) =>
          currentCourse.instructorNames.toLowerCase().includes(keyword)
        )
      );
    }

    courses.sort((c1, c2) => {
      if (c1.overallQuality == null || isNaN(c1.overallQuality))
        c1.overallQuality = 0.0;
      if (c2.overallQuality == null || isNaN(c2.overallQuality))
        c2.overallQuality = 0.0;
      switch (this.state.filters.sortBy) {
        // sortBy === 1 means sort by quality rating with higher quality courses first
        case 1:
          return c2.overallQuality - c1.overallQuality;

        // sortBy === 0 (default) means sort by course number where lower level courses appear first
        case 0:
        default:
          return Number(c1.num.slice(-3)) - Number(c2.num.slice(-3));
      }
    });

    return courses;
  };

  render() {
    const { activePage, courses, filters } = this.state;
    const matchingCourses = this.search(courses, filters);
    const visibleCourses = matchingCourses.slice(
      (activePage - 1) * 50,
      activePage * 50
    );
    const isMobile = window.innerWidth < 620;

    return (
      <>
        <Header loading={this.state.loading} />
        <br />
        <div className="site-container">
          <div style={{ paddingTop: "5px" }}>
            <div style={{ marginBottom: "0px" }}>
              <SearchFilter
                filters={filters}
                updateSearchFilters={this.updateSearchFilters}
                isMobile={isMobile}
              />
            </div>

            <div
              className="sort-wrapper"
              style={{ marginTop: "10px", marginBottom: "-5px" }}
            >
              <div style={{ width: "100%" }}>
                <SortFilter
                  filters={filters}
                  updateSearchFilters={this.updateSearchFilters}
                />
              </div>
              <div style={{ float: "right" }}>
                <PaginationComponent
                  page={activePage}
                  changePage={this.changePage}
                  length={matchingCourses.length}
                />
              </div>
            </div>
          </div>

          <CourseListTable
            isMobile={isMobile}
            visibleCourses={visibleCourses}
            activePage={activePage}
          />

          <div
            className="flex-wrapper"
            style={{ marginTop: "-5px", float: "right" }}
          >
            <PaginationComponent
              page={activePage}
              changePage={this.changePage}
              length={matchingCourses.length}
            />
          </div>
        </div>
      </>
    );
  }
}

export default CourseList;
