import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BFSPage from "./pages/BFSPage";
import DFSPage from "./pages/DFSPage";
import MSTPage from "./pages/MSTPage";
import TOPPage from "./pages/TOPPage";
import DAGPage from "./pages/DAGPage";
import SCCPage from "./pages/SCCPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Toolbar from "./components/layout/Toolbar";
import GraphSandbox from './components/graph/Sandbox';

const elements = [
    { data: { id: "A" }, position: { x: 100, y: 100 } },
    { data: { id: "B" }, position: { x: 300, y: 100 } },
    { data: { source: "A", target: "B" } }
];

function App() {
  return (
    <Router>
      <Toolbar />
      <Routes>
        { <Route path="/" element={<Home />} />  }
        { <Route path="/bfs" element={<BFSPage />} />}
        { <Route path="/dfs" element={<DFSPage />} />  }
        { <Route path="/mst" element={<MSTPage />} />  }
        { <Route path="/top" element={<TOPPage />} />  }
        { <Route path="/dag" element={<DAGPage />} />  }
        { <Route path="/scc" element={<SCCPage />} />  }
      </Routes>
    </Router>
  );
}

export default App;
