import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BFSPage from "./pages/Algorithms/BFS/BFSPage";
import DFSPage from "./pages/Algorithms/DFS/DFSPage";
import MSTPage from "./pages/Algorithms/MST/MSTPage";
import TOPPage from "./pages/Algorithms/TOP/TOPPage";
import DAGPage from "./pages/Algorithms/DAG/DAGPage";
import SCCPage from "./pages/Algorithms/SCC/SCCPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Toolbar from "./pages/Toolbar";
import GraphSandbox from './components/graphPanel/Sandbox/Sandbox';
import SavedGraphsPage from "./pages/SavedGraphs/SavedGraphsPage";

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
        { <Route path="/save_graph" element={<SavedGraphsPage />} />  }
      </Routes>
    </Router>
  );
}

export default App;
