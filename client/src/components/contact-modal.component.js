import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ContactModal extends Component {
    render() {
        const props = this.props
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        About This Site
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Beginning with the Spring 2020 semester, Johns Hopkins is no longer posting summarized course evaluations.
                        This platform was created in order to make up for that loss, so that students can continue to select courses that meet their needs.
                    </p>
                    <p>
                        <b>Any questions or feedback?</b> Just email us at <a href="mailto:contact@jhureviews.com">contact@jhureviews.com</a>.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}