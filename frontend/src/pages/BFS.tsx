import React, { useEffect, useState } from "react";
import GraphCanvas from "../components/GraphCanvas";
import { fetchGraph } from "../services/api";
import AlgoCard from '../components/AlgoCard'
import '../styles/Home.css'
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

    <h1 className="text-center">
        Welcome to the AlgoVision
    </h1>

<div className="container-fluid">
    <div className="row top">
        <div className="col">
        <AlgoCard 
            algoName="Topological Sort" 
            description="DFS begins at a chosen starting node, but instead of exploring neighbors level by level, DFS
                follows one path as deeply as possible before backtracking." 
            headerColor="#1dc400ff" 
            link="/dfs"/>
        </div>
        <div className="col">
        <AlgoCard 
            algoName="DAG Checking" 
            description="BFS begins at a starting node, explores all immediate neighbors (first level) and continues level by level. 
            Finds the shortest path in terms of number of edges in unweighted graphs." 
            headerColor="#ffba0cff" 
            link="/bfs"/>
        </div>
        <div className="col">
            <AlgoCard 
                algoName="Strongly Connected Components" 
                description="MST of an edge-weighted graph is a
                spanning tree whose weight (the sum of the weights of its edges) is no larger than the weight of
                any other spanning tree." 
                headerColor="#2891faff" 
                link="/mst"/>
        </div>

    </div>
</div>

</div>);
}
