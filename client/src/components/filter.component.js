import React, { Component } from 'react';
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import Popover from "./popover.component";

export default class Filter extends Component{
    render() {
        const props = this.props
        return(<>
            <div className="header-wrapper">

                <div className="search-flex">
                    <InputGroup style={{marginRight: "15px"}} className="mb-3">
                        <FormControl 
                            placeholder="Search for a course or department..."
                            defaultValue={props.filters[0]}
                            id="basic-url1" 
                            onChange={props.filterCourse}
                        />
                    </InputGroup>
                    <InputGroup style={{marginRight: "15px"}} className="mb-3">
                        <FormControl 
                            placeholder="Search for an instructor..."
                            defaultValue={props.filters[2]}
                            id="basic-url3" 
                            onChange={props.filterInstructor}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                            <FormControl 
                                defaultValue={props.filters[10]}
                                placeholder="Search for a minimum rating..."
                                id="basic-url4" 
                                onChange={props.filterRating}
                            />
                    </InputGroup>
                </div>

                <div style={{marginTop: "5px", marginLeft: "1px"}}>
                    <Form>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <div className="filter-wrapper">
                                    <div className="flex-wrapper">
                                        <Form.Check onChange={props.filterH} defaultChecked={props.filters[4]} inline label="H" type={type} id={`inline-${type}-2`} />
                                        <Form.Check onChange={props.filterS} defaultChecked={props.filters[5]} inline label="S" type={type} id={`inline-${type}-3`} />
                                        <Form.Check onChange={props.filterN} defaultChecked={props.filters[6]} inline label="N" type={type} id={`inline-${type}-4`} />
                                        <Form.Check onChange={props.filterE} defaultChecked={props.filters[7]} inline label="E" type={type} id={`inline-${type}-5`} />
                                        <Form.Check onChange={props.filterQ} defaultChecked={props.filters[8]} inline label="Q" type={type} id={`inline-${type}-6`} />
                                        <Form.Check onChange={props.filterNA} defaultChecked={props.filters[9]} inline label="No N/A" type={type} id={`inline-${type}-7`} />
                                        <div style={{marginLeft:"-12px", marginRight:"10px"}} >
                                            <Popover title="What's this?" scaleOne="Checking this option hides courses with no area designation" />
                                        </div>
                                    </div>
                                    <div className="flex-wrapper">
                                        <Form.Check onChange={props.filterW} defaultChecked={props.filters[3]} inline label="Writing Only" type={type} id={`inline-${type}-1`} />
                                        <Form.Check onChange={props.filterOffered} defaultChecked={props.filters[1]} inline label="Offered in Fall '20" type={type} id={`inline-${type}-8`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Form>
                </div>

            </div>
        </>)
    }
}