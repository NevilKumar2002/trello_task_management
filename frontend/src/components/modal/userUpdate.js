import React from 'react';
import {Form,Col,Modal,Button} from 'react-bootstrap';
import "./model.css";

function UserUpdateModel(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Select User</Form.Label>
            <Form.Control
              as="select"
              value={props.user}
              onChange={(e) => props.onChangeUser(e.target.value)}
            >
              {props.users.map((value) => {
                return <option value={value}>{value}</option>;
              })}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={() => props.onSubmit()}
          >
            {" "}
            Add{" "}
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default UserUpdateModel;