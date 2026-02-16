import '../../../styles/data_container/bfs.css'

export default function DFSDataVisualization({step}) {

    if (!step) return null;

    return (

        <div className="bfs-data-panel">

            {!step.isFinal && ( 
                <>
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
                        <p>{step.visited}</p>
                    </div>
                </>
            )}

            {step.isFinal && (
                <div className="block result">
                    <h3>Result</h3>

                    {step.result !== undefined && (
                        <p>DFS: {step.result}</p>
                    )}
                </div>
            )}
        
        </div>
    );

}