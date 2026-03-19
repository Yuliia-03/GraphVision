export default function BFSExample(){

    return(
        <>
            <h4>Breadth First Search</h4>

            <p>
                BFS explores the graph level by level using a queue.
            </p>

            <ol>
                <li>Start with a source node</li>
                <li>Add neighbours to queue</li>
                <li>Repeat until queue empty</li>
            </ol>

            <p>
                Example traversal:
            </p>

            <pre>A → B → C → D → E → F</pre>
        </>
    )
}