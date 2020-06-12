import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class ContactModal extends Component {
  render() {
    const props = this.props;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            About JHUReviews
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Beginning with the Spring 2020 semester, Johns Hopkins is no longer
            posting summarized course evaluations. This platform was created in
            order to make up for that loss, so that students can continue to
            review courses and select courses that meet their needs.
          </p>
          <p>
            <b>Any questions or feedback?</b> Just email us at{" "}
            <a href="mailto:contact@jhureviews.com">contact@jhureviews.com</a>.
          </p>
          <p style={{ marginTop: "-15px" }}>
            <b>Like our emojis?</b> Download the{" "}
            <a href="https://apps.apple.com/app/id1512611054?app=messages">
              sticker pack
            </a>{" "}
            and follow Bleu the Bleu Jay on{" "}
            <a href="https://www.instagram.com/bleu_adventures/">Instagram</a>.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
