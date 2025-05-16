import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css"
import UserTest from "./components/UserTest";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testing" element={<UserTest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
