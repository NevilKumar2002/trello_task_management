import React from 'react';
import {Form,Col,Modal,Button, Container,Row} from 'react-bootstrap';
import "./model.css";

const Task = (props) => (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      variant="dark"
      animation
      autoFocus
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
            <Row>
                <Col>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={props.description} rows={3} onChange={e=>props.onChangeDes(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Move To</Form.Label>
                    <Form.Control as="select" value={props.stage} onChange={e => props.onChangeStage(e.target.value)}>
                    <option value={0}>To Do</option>
                    <option value={1}>In Development</option>
                    <option value={2}>To Be Reviewed</option>
                    <option value={3}>Finished</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Add User</Form.Label>
                    <Form.Control as="select" value={props.taskUsers} onChange={e => props.onChangeUser(e.target.value)}>
                        {
                            props.users.map((value)=>{
                                return <option value={value}>{value}</option>
                            })
                        }
                    </Form.Control>
                </Form.Group>
                </Col>
            </Row>


        </Container>
            
      </Modal.Body>

      <Modal.Footer>
      <Button variant="primary" type="submit" onClick={()=>props.onSubmit()}> Save </Button>
      <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
);

export default Task;