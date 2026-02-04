import '../../styles/Control.css'
import { useGraph } from '../../contexts/GraphContext';


export function ButtonPanel({params, algorithm}){
    const { nodes, edges, graphConfig } = useGraph();

    const run = () => {
        console.log("algorithm:", algorithm);
        console.log("is class?", algorithm.prototype?.constructor === algorithm);

        const algo = new algorithm(nodes, edges, graphConfig); // graphConfig optional
        const steps = algo.run(params.task, params);   
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