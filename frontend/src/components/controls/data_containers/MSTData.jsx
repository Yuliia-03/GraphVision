import '../../../styles/data_container/bfs.css'

export default function BFSDataVisualization({step}) {

    if (!step) return null;

    return (

        <div className="bfs-data-panel">

            <div className="block"> 
                <p>Action: {step.message || ""}</p>

                <p>Current edge: {step.currentEdge || ""}</p>
            </div>

            <div className="block">
                <p> Weight </p>
                <p>{step.weight}</p>
            </div>

            <div className="block">
                <p>MST Tree </p>
                <p>{step.mstTree}</p>
            </div>

            <div className="block">
                <p>Visited </p>
                <p>{step.visitedEdges}</p>
            </div>
        
        </div>
    );

}