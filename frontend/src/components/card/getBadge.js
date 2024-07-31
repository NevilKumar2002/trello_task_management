import React from "react";
import {OverlayTrigger,Tooltip,Badge} from "react-bootstrap";

//create a badge for each user on card
export default function GetBadge(user){
    const varients = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "light",
    ];

    var firstChar = user.charAt(0);
    firstChar = firstChar.toUpperCase();

    //get a random color
    var varient = varients[Math.floor(Math.random() * varients.length)];
    return (
      <OverlayTrigger overlay={<Tooltip>{user}</Tooltip>}>
        <Badge style={{ marginRight: "0.2rem",marginTop: "0.5rem" }} variant={varient}>
          {" "}{firstChar}{" "}
        </Badge>
      </OverlayTrigger>
    );
  }