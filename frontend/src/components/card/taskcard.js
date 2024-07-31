import React from "react";
import { Col, Card } from "react-bootstrap";
import GetBadge from "../card/getBadge";

export default function TaskCard(props) {
  return (
    <Col sm xs={12} md={4}>
      <Card
        className="text-center"
        bg="dark"
        variant="dark"
        style={{ width: "14rem", height: "12rem", marginTop: "1rem" }}
      >
        <Card.Body>
          <Card.Title>{props.Task.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.Task.description}
          </Card.Subtitle>
        </Card.Body>
        <Card.Footer className="text-muted">
          {props.Task.members.map((value) => {
            return GetBadge(value);
          })}
        </Card.Footer>
      </Card>
    </Col>
  );
}