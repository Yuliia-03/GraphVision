import '../../styles/Control.css'
import { useGraph } from '../../contexts/GraphContext';


export function ButtonPanel({params, algorithm}){
    const { nodes, edges, graphConfig } = useGraph();

    const run = () => {
        const algo = new algorithm(nodes, edges, graphConfig); // graphConfig optional
        const steps = algo.run(params);   
        console.log("Steps:", steps);
    }
    return(
        <>
        
            <button onClick={() => {run()}}>
                Run
            </button>

            <button>Pause</button>
            <button>Next Step</button>

        
        </>
    );
}