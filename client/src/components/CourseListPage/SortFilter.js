import React from "react";
import { Form } from "react-bootstrap";

const SortFilter = (props) => (
  <>
    <div>
      <div style={{ marginLeft: "1px" }}>
        <Form>
          {["checkbox"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <div className="flex-wrapper">
                <div style={{ marginLeft: "0px" }}>
                  <Form.Control
                    size="sm"
                    style={{ width: "180px", color: "#007bff" }}
                    as="select"
                    onChange={(e) => {
                      props.updateSearchFilters({
                        sortBy: e.target.selectedIndex,
                      });
                    }}
                    defaultValue={props.filters.sortBy}
                  >
                    <option value={0}>Sort By: Course Level</option>
                    <option value={1}>Sort By: Rating</option>
                  </Form.Control>
                </div>
              </div>
            </div>
          ))}
        </Form>
      </div>
    </div>
  </>
);

export default SortFilter;
