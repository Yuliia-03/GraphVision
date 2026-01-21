import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        { <Route path="/" element={<Home />} />  }
        { <Route path="/bfs" element={<Home />} />  }
      </Routes>
    </Router>
  );
}

export default App;
