import React from 'react';
import { Form, Col, Modal, Button } from 'react-bootstrap';
import "./model.css";

const NewBoard = ({ show, onHide, boardName, description, onChangeName, onChangeDescription, onSubmit }) => (
  <Modal
    show={show}
    onHide={onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className="success"
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Enter New Board Details
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group as={Col} controlId="formGridText">
          <Form.Label>Board Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Board Name"
            value={boardName}
            onChange={e => onChangeName(e.target.value)} // Handle change
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridText">
          <Form.Label>Enter Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Board Details"
            value={description}
            onChange={e => onChangeDescription(e.target.value)} // Handle change
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onSubmit}>
        Create
      </Button>
      <Button onClick={onHide}>Cancel</Button>
    </Modal.Footer>
  </Modal>
);

export default NewBoard;
