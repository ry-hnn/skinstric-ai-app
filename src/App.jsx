import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css"
import UserTest from "./pages/UserTest";
import Analysis from "./pages/Analysis";
import StartAnalysis from "./pages/StartAnalysis";
import Demographics from "./pages/Demographics";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testing" element={<UserTest />} />
          <Route path="/start-analysis" element={<StartAnalysis />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/demographics" element={<Demographics />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
