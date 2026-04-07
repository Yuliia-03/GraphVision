
import AlgoCard from '../../components/AlgoCard'
import '../../styles/Home.css'

export default function Home() {
return (

    <div>

        <div className="container-fluid">
            
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 top">
                
                <div className="col d-flex justify-content-center">
                    <AlgoCard 
                        algoName="Depth-First-Search" 
                        description="DFS begins at a chosen starting node, but instead of exploring neighbors level by level, DFS
                            follows one path as deeply as possible before backtracking." 
                        headerColor="#d01f6fff" 
                        link="/dfs"
                    />
                </div>
                
                <div className="col d-flex justify-content-center">
                    <AlgoCard 
                        algoName="Breadth-first search" 
                        description="BFS begins at a starting node, explores all immediate neighbors (first level) and continues level by level. 
                        Finds the shortest path in terms of number of edges in unweighted graphs." 
                        headerColor="#1b27cfff" 
                        link="/bfs"
                    />
                </div>
                
                <div className="col d-flex justify-content-center">
                    <AlgoCard 
                        algoName="Minimum Spanning Tree" 
                        description="MST of an edge-weighted graph is a
                        spanning tree whose weight (the sum of the weights of its edges) is no larger than the weight of
                        any other spanning tree." 
                        eaderColor="#8e44ad" 
                        link="/mst"
                    />
                </div>

                <div className="col d-flex justify-content-center">
                    <AlgoCard 
                        algoName="Topological Sort"
                        description="A topological sort is a linear ordering of the nodes of a directed graph, 
                        such that for every directed edge from node a to node b, a appears before b in the ordering."
                        headerColor="#1dc400ff" 
                        link="/top"
                    />
                </div>

                <div className="col d-flex justify-content-center">
                    <AlgoCard 
                        algoName="DAG Checking" 
                        description="A directed acyclic graph (DAG) is a directed graph that contains no directed cycles."
                        headerColor="#ffba0cff" 
                        link="/dag"
                    />
                </div>

                <div className="col d-flex justify-content-center">
                    <AlgoCard 
                        algoName="Strongly Connected Components" 
                        description="A strongly connected component (SCC) of a directed graph is a maximal set of nodes in which
                        every node is reachable from any other node in the same set."
                        headerColor="#2891faff" 
                        link="/scc"
                    />
                </div>

            </div>
        </div> 

    </div>);
}
