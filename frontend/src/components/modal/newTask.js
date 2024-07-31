import React from 'react';
import {Form,Col,Modal,Button} from 'react-bootstrap';
import "./model.css";

const NewTask = (props) => (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter New Task Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group as={Col} controlId="formGridText">
            <Form.Label>Task Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Board Name" value={props.taskName} onChange={e => props.onChangeName(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridText">
            <Form.Label>Enter Description</Form.Label>
            <Form.Control type="text" placeholder="Enter Board Details" value={props.description} onChange={e => props.onChangeDes(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Select User</Form.Label>
                <Form.Control as="select" value={props.taskUsers} onChange={e => props.onChangeUser(e.target.value)}>
                    {
                        props.users.map((value)=>{
                            return <option value={value}>{value}</option>
                        })
                    }
                </Form.Control>
            </Form.Group>
            
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Select Stage</Form.Label>
                <Form.Control as="select" value={props.stage} onChange={e => props.onChangeStage(e.target.value)}>
                <option value={0}>To Do</option>
                <option value={1}>In Development</option>
                <option value={2}>To Be Reviewed</option>
                <option value={3}>Finished</option>
                </Form.Control>
            </Form.Group>
        </Form>

      </Modal.Body>
      <Modal.Footer>
      <Button variant="primary" type="submit" onClick={()=>props.onSubmit()}> Create </Button>
      <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
);

export default NewTask;