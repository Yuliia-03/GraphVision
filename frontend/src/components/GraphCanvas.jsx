import React, { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone";

export default function GraphCanvas({ graphData }) {
  const containerRef = useRef(null);

  useEffect(() => {

    if (!graphData) return;
    const nodes = graphData.nodes.map((id) => ({ id: id.toString(), label: id.toString() }));
    const edges = graphData.edges.map(([from, to]) => ({
        from: from.toString(),
        to: to.toString(),
    }));

    const data = { nodes, edges };
    const options = {
      nodes: { shape: "dot", size: 16 },
      edges: { arrows: "to",
        smooth: false,
       },
  physics: false,
    };
    console.log(graphData)
    const network = new Network(containerRef.current, data, options);
    return () => network.destroy();
  }, [graphData]);

  return <div ref={containerRef} style={{ height: "600px", width: "100%" }} />;
}
