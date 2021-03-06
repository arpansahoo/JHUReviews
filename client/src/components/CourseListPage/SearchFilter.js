import React from "react";
import { InputGroup, FormControl, Form } from "react-bootstrap";

const SearchFilter = (props) => (
  <>
    <div>
      <div className="search-flex">
        <InputGroup
          style={{ marginRight: "20px", marginTop: "-5px" }}
          className="mb-3"
        >
          <FormControl
            placeholder="Search for a course..."
            defaultValue={props.filters.courseName}
            onChange={(e) => {
              props.updateSearchFilters({ courseName: e.target.value });
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter" && props.isMobile) {
                // hide mobile keyboard after pressing enter
                e.target.blur();
              }
            }}
          />
        </InputGroup>
        <InputGroup style={{ marginTop: "-5px" }} className="mb-3">
          <FormControl
            placeholder="Search for an instructor..."
            defaultValue={props.filters.instructorName}
            onChange={(e) => {
              props.updateSearchFilters({ instructorName: e.target.value });
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter" && props.isMobile) {
                // hide mobile keyboard after pressing enter
                e.target.blur();
              }
            }}
          />
        </InputGroup>
      </div>

      <div style={{ marginLeft: "1px" }}>
        <Form>
          {["checkbox"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <div className="filter-wrapper">
                <div className="flex-wrapper">
                  <Form.Check
                    onChange={(e) => {
                      props.updateSearchFilters({
                        includeHumanitiesAreaDesignation: e.target.checked,
                      });
                    }}
                    defaultChecked={
                      props.filters.includeHumanitiesAreaDesignation
                    }
                    inline
                    label="H"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    onChange={(e) => {
                      props.updateSearchFilters({
                        includeSocialSciencesAreaDesignation: e.target.checked,
                      });
                    }}
                    defaultChecked={
                      props.filters.includeSocialSciencesAreaDesignation
                    }
                    inline
                    label="S"
                    type={type}
                    id={`inline-${type}-3`}
                  />
                  <Form.Check
                    onChange={(e) => {
                      props.updateSearchFilters({
                        includeNaturalSciencesAreaDesignation: e.target.checked,
                      });
                    }}
                    defaultChecked={
                      props.filters.includeNaturalSciencesAreaDesignation
                    }
                    inline
                    label="N"
                    type={type}
                    id={`inline-${type}-4`}
                  />
                  <Form.Check
                    onChange={(e) => {
                      props.updateSearchFilters({
                        includeEngineeringAreaDesignation: e.target.checked,
                      });
                    }}
                    defaultChecked={
                      props.filters.includeEngineeringAreaDesignation
                    }
                    inline
                    label="E"
                    type={type}
                    id={`inline-${type}-5`}
                  />
                  <Form.Check
                    onChange={(e) => {
                      props.updateSearchFilters({
                        includeQuantitativeAreaDesignation: e.target.checked,
                      });
                    }}
                    defaultChecked={
                      props.filters.includeQuantitativeAreaDesignation
                    }
                    inline
                    label="Q"
                    type={type}
                    id={`inline-${type}-6`}
                  />
                  <Form.Check
                    onChange={(e) => {
                      props.updateSearchFilters({
                        includeCoursesWithoutAreaDesignation: e.target.checked,
                      });
                    }}
                    defaultChecked={
                      props.filters.includeCoursesWithoutAreaDesignation
                    }
                    inline
                    label="Include N/A"
                    type={type}
                    id={`inline-${type}-7`}
                  />
                </div>

                <div className="flex-wrapper">
                  <Form.Check
                    onChange={(e) => {
                      props.updateSearchFilters({
                        writingIntensive: e.target.checked,
                      });
                    }}
                    defaultChecked={props.filters.writingIntensive}
                    inline
                    label="Writing Only"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    onChange={(e) => {
                      props.updateSearchFilters({
                        offeredNextSem: e.target.checked,
                      });
                    }}
                    defaultChecked={props.filters.offeredNextSem}
                    inline
                    label="Offered in Spring '21"
                    type={type}
                    id={`inline-${type}-8`}
                  />
                </div>
              </div>
            </div>
          ))}
        </Form>
      </div>
    </div>
  </>
);

export default SearchFilter;
