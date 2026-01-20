import React, { useEffect, useState } from "react";
import GraphCanvas from "../components/GraphCanvas";
import { fetchGraph } from "../services/api";
import AlgoComponent from '../components/AlgoComponent'

// export default function GraphPage() {
//   const [graph, setGraph] = useState(null);

//   useEffect(() => {
//     fetchGraph().then(setGraph).catch(console.error);
//   }, []);

//   if (!graph) return <p>Loading graph...</p>;

// //   return <GraphCanvas graphData={graph} />;
// return (
// <div>




// </div>);
// }

export default function Home() {
return (
<div>
    
<AlgoComponent algoName="BFS" />
<AlgoComponent algoName="DFS" />
<AlgoComponent algoName="MST" />
</div>);
}
