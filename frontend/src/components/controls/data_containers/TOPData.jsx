import '../../../styles/data_container/bfs.css'

export default function BFSDataVisualization({step}) {

    if (!step) return null;

    return (

        <div className="bfs-data-panel">

            <div className="block"> 
                <p>Action: {step.message || ""}</p>

                <p>Current: {step.current || ""}</p>
            </div>

            <div className="block">
                <p>Queue </p>
                <p>{step.inQueue}</p>
            </div>
            <div className="block">
                <p>Visited </p>
                <p>{step.visited}</p>
            </div>
        
        </div>
    );

}