import React, { Component } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

export default class PopoverComponent extends Component {
    render() {
        const props = this.props
        return (
            <div className="flex-wrapper">
                <p style={{paddingRight:"2px", margin:"0"}}>{props.name}</p>
                <OverlayTrigger
                    placement={props.position}
                    overlay={
                        <Popover id="popover-basic">
                            <Popover.Title as="h3">{props.title}</Popover.Title>
                            <Popover.Content>
                            <p style={{margin:"0"}}>{props.scaleOne}</p>
                            <p style={{margin:"0"}}>{props.scaleTwo}</p>
                            </Popover.Content>
                        </Popover>
                    }
                >
                    <p style={{margin:"0", color:"#007bff"}}>(?)</p>
                </OverlayTrigger>
            </div>
        );
    }
}