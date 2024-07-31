import React from "react";
import { Col, Card } from "react-bootstrap";
import { useHistory, useNavigate } from "react-router-dom";
import GetBadge from "../card/getBadge";

export default function BoardCard(props) {
const navigate= useNavigate();
  function goToBoard(id) {
    navigate("/dashboard/" + id + "/board");
  }

  return (
    <Col sm xs={12} md={4}>
      <Card
        onClick={() => goToBoard(props.board._id)}
        className="text-center"
        bg="dark"
        variant="dark"
        style={{ width: "20rem", height: "15rem", margin: "1rem" }}
      >
        <Card.Header>{props.board.name}</Card.Header>
        <Card.Body>
          <Card.Title>{props.board.description}</Card.Title>
        </Card.Body>
        <Card.Footer className="text-muted">
          {props.board.members.map((value) => {
            return GetBadge(value);
          })}
        </Card.Footer>
      </Card>
    </Col>
  );
}