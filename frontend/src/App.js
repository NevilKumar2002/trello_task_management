import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/loginRegister/Login";
import Signup from "./components/loginRegister/Signup";
import DashBoard from "./components/dashboard/dashboard";
import Board from "./components/Board/Board";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/dashboard/:id/board" element={<Board />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
