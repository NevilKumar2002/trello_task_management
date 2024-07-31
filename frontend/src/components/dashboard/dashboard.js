import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Button } from 'react-bootstrap';
import AuthService from "../../services/auth.services";
import UserService from "../../services/user.services";
import NavigationBar from "../Navbar/navbar";
import BoardCard from "../card/card";
import NewBoard from "../modal/newBoard";
import "./dashboard.css";

export default function DashBoard() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const fetchBoards = async () => {
    try {
      const authorized = await AuthService.isLoggedIn();
      if (!authorized) {
        navigate("/login");
        return;
      }

      const response = await UserService.getBoards();
      setName(response.data.name);
      setBoards(response.data.boards);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  const handleCreateBoard = async () => {
    try {
        console.log('Creating Board....')

      await UserService.createBoard(boardName, description);
      console.log("The Board is Just Created! Enjoy");
      setBoardName("");
      setDescription("");
      setModalShow(false);
      fetchBoards();
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="DashBoard">
      <NavigationBar user={name} />
      <div className="Dashboard-header">
        <Button
          variant="outline-primary"
          style={{ marginTop: "2%", marginBottom: "1%" }}
          onClick={() => setModalShow(true)}
        >
          Create Board
        </Button>
        <NewBoard
          show={modalShow}
          onHide={() => setModalShow(false)}
          boardName={boardName}
          description={description}
          onChangeName={setBoardName} // Handle change
          onChangeDescription={setDescription} // Handle change
          onSubmit={handleCreateBoard}
        />
        <Container>
          <Row>
            {boards.map((board) => (
              <BoardCard key={board._id} board={board} />
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
