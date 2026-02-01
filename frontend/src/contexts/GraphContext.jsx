import { createContext, useContext, useState, useMemo } from "react";
import { Algorithms } from "../services/algorithms";

const GraphContext = createContext(null);

export const GraphProvider = ({ algorithm, children }) => {
    const rules = useMemo(() => Algorithms[algorithm], [algorithm]);

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    
    const [graphConfig, setGraphConfig] = useState(() => ({
        directed: rules.allowsDirected && !rules.allowsUndirected
    }));


  return (
    <GraphContext.Provider
      value={{
        algorithm,
        rules,
        graphConfig,
        nodes,
        edges,
        setNodes,
        setEdges,
        setGraphConfig,
      }}>
      {children}
    </GraphContext.Provider>
  );
};


export const useGraph = () => {
    const ctx = useContext(GraphContext);
    if (!ctx) {
        throw new Error("useGraph must be used inside GraphProvider");
    }
    return ctx;
};