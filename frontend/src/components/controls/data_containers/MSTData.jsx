import '../../../styles/data_container/mst.css'

export default function MSTDataVisualization({step}) {

    if (!step) return null;

    return (

        <div id="mst-data-panel" className="mst-data-panel">

            <div className="block "> 
                <p>Action: {step.message || ""}</p>
            </div>

            <div className='block inline'>
                <p>Current edge: </p>
                <div className="node-list">
                    {step.currentEdge ? 
                        (
                            <span className="edge-chip active">
                                {step.currentEdge}
                            </span>
                        ):
                    <p>-</p>}
                </div>
            </div>

            <div className="block inline">
                <p> Weight </p>
                <p className="weight">{step.weight}</p>
            </div>

            <div className="block inline">
                <p>MST Tree </p>
                <div className="node-list">
                    {step.mstTree.map((edge, i) => (
                        <span key={i} className="edge-chip">
                            {edge}
                        </span>
                    ))}
                </div>
            </div>

            <div className="block inline">
                {step.visitedEdges && <p>Visited </p>}
                <div className="node-list">

                    {step.visitedEdges?.map((edge, i) => (
                        <span key={i} className="edge-chip">
                            {edge}
                        </span>

                    ))}
                    {step.inQueue && <p>Queue </p>}
                    {step.inQueue?.map((edge, i) => (
                        <>
                            <div key={i} className="edge-chip">
                                {edge}
                            </div>
                        </>
                    ))}
                </div>
            </div>
        
        </div>
    );

}