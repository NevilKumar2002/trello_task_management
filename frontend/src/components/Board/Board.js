import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

import AuthService from "../../services/auth.services";
import UserService from "../../services/user.services";

import NavigationBar from "../Navbar/navbar";
import NewTask from "../modal/newTask";
import UserUpdateModel from "../modal/userUpdate";
import Task from "../modal/Task";
import TaskCard from "../card/taskcard";
import GetBadge from "../card/getBadge";
import "../dashboard/dashboard.css";

export default function Board() {
  // State Hooks
  const [modalShow, setModalShow] = useState(false);
  const [taskShow, setTaskShow] = useState(false);
  const [userUpdate, setUserUpdateShow] = useState(false);
  const [todoTasks, setTodoTasks] = useState([]);
  const [inDevelopmentTasks, setDevTasks] = useState([]);
  const [toBeReviewedTasks, setRevTasks] = useState([]);
  const [finishedTasks, setFinTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [description, setDescription] = useState("");
  const [newUser, setNewUser] = useState("");
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDes] = useState("");
  const [taskUsers, setTaskUsers] = useState([]);
  const [taskStage, setTaskStage] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const boardID = location.pathname.replace("/dashboard/", "").replace("/board", "");

  useEffect(() => {
    // Fetch data on component mount
    const fetchBoardData = async () => {
      try {
        const response = await UserService.getBoard(boardID);
        const authorized = await AuthService.isLoggedIn();
        if (!authorized) {
          navigate("/login");
        } else {
          setUsers(response.data.data.members);
          setBoardName(response.data.data.name);
          setDescription(response.data.data.description);
          setTaskUsers(response.data.data.members[0]);

          const t = [];
          const d = [];
          const r = [];
          const f = [];
          response.data.data.tasks.forEach(task => {
            if (task.stage === 0) t.push(task);
            else if (task.stage === 1) d.push(task);
            else if (task.stage === 2) r.push(task);
            else if (task.stage === 3) f.push(task);
          });
          setTodoTasks(t);
          setDevTasks(d);
          setRevTasks(r);
          setFinTasks(f);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const data = await AuthService.getUsers();
        const usersList = data.data.message.map(user => user.email);
        setAllUsers(usersList);
        setNewUser(usersList[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBoardData();
    fetchAllUsers();
  }, [boardID, navigate]);

  const onSubmit = async () => {
    try {
      await UserService.addtask(boardID, taskName, taskDescription, [taskUsers], taskStage);
      setModalShow(false);
      setBoardName("");
      setDescription("");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting task", error);
    }
  };

  const onUserUpdate = async () => {
    try {
      const data = { id: boardID, members: [...users, newUser] };
      setUsers([...users, newUser]);
      await UserService.updateBoard(data);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const onUpdateTask = async () => {
    try {
      const data = {
        id: boardID,
        taskId,
        name: taskName,
        description: taskDescription,
        stage: taskStage,
        member: newUser,
      };
      await UserService.updateTask(data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <div className="Dashboard">
      <NavigationBar user={JSON.parse(localStorage.getItem("user")).name} />

      <div className="Dashboard-header">
        <UserUpdateModel
          show={userUpdate}
          onHide={() => setUserUpdateShow(false)}
          users={allUsers}
          user={newUser}
          onChangeUser={(value) => setNewUser(value)}
          onSubmit={onUserUpdate}
        />

        <NewTask
          show={modalShow}
          onHide={() => setModalShow(false)}
          taskName={taskName}
          description={taskDescription}
          stage={taskStage}
          taskUsers={taskUsers}
          users={users}
          onChangeName={(value) => setTaskName(value)}
          onChangeDes={(value) => setTaskDes(value)}
          onChangeStage={(value) => setTaskStage(value)}
          onChangeUser={(value) => setTaskUsers(value)}
          onSubmit={onSubmit}
        />

        <Task
          show={taskShow}
          onHide={() => {
            setTaskShow(false);
            setTaskName("");
            setTaskDes("");
            setTaskStage(0);
          }}
          name={taskName}
          description={taskDescription}
          stage={taskStage}
          taskUsers={newUser}
          users={users}
          onChangeDes={(value) => setTaskDes(value)}
          onChangeStage={(value) => setTaskStage(value)}
          onChangeUser={(value) => setNewUser(value)}
          onSubmit={onUpdateTask}
        />

        <Container style={{ marginBottom: "1rem" }}>
          <Card bg="dark" variant="dark" className="text-center">
            <Card.Body>
              <Card.Title>{boardName}</Card.Title>
              <Card.Subtitle>{description}</Card.Subtitle>
              Users:
              {users.map(value => GetBadge(value))}
              <Button
                variant="primary"
                onClick={() => setUserUpdateShow(true)}
              >
                <Badge pill variant="info"> + </Badge>
              </Button>
            </Card.Body>
          </Card>
        </Container>

        <Container>
          <Row lg={4}>
            {[
              { stage: 0, title: "TO DO", tasks: todoTasks },
              { stage: 1, title: "In Development", tasks: inDevelopmentTasks },
              { stage: 2, title: "To Be Reviewed", tasks: toBeReviewedTasks },
              { stage: 3, title: "Finished", tasks: finishedTasks },
            ].map(({ stage, title, tasks }) => (
              <Col key={stage}>
                <Button
                  variant="primary"
                  size="lg"
                  block
                  onClick={() => {
                    setTaskStage(stage);
                    setModalShow(true);
                  }}
                >
                  {title} <Badge pill variant="info"> + </Badge>
                </Button>
                {tasks.map(value => (
                  <div
                    key={value._id}
                    onClick={() => {
                      setTaskId(value._id);
                      setTaskShow(true);
                      setTaskName(value.name);
                      setTaskDes(value.description);
                    }}
                  >
                    <TaskCard Task={value} />
                  </div>
                ))}
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
