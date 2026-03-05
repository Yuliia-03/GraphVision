import '../../../styles/data_container/bfs.css'

export default function DAGDataVisualization({step}) {

    if (!step) return null;

    return (

        <div id="data-panel" className="bfs-data-panel">

            <div className="block"> 
                <p>Action: {step.message || ""}</p>

                <p>Current: {step.current || ""}</p>
            </div>

            <div className="block">
                <p>Stack </p>
                <p>{step.inStack}</p>
            </div>
            <div className="block">
                <p>Visited </p>
                <p>{step.topoOrder}</p>
            </div>
        
        </div>
    );

}