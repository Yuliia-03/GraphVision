export const dfsQuestionTemplates = [
    {
        id: 1,
        type: "stack_after_processing",
        text: "After processing node {node}, what will the stack contain?",
        hint: "DFS pops {node} from the top of the stack, then pushes all unvisited neighbors onto the stack. The last added node will be processed next."
    },
    {
        id: 2,
        type: "discover_nodes",
        text: "After DFS processes node {node}, which NEW nodes will be discovered?",
        hint: "Only neighbors of {node} that have NOT been visited yet will be discovered and pushed onto the stack."
    },
    {
        id: 3,
        type: "next_action",
        text: "We've explored {node}. Current stack: {stack}. What will DFS do next?",
        hint: "DFS always processes the node at the top of the stack next (last-in, first-out)."
    },
    {
        id: 4,
        type: "edges_leading_new",
        text: "When inspecting node {node}, which edges will lead to new nodes?",
        hint: "Only edges from {node} that lead to unvisited nodes will result in new discoveries."
    },
    {
        id: 5,
        type: "visited_set",
        text: "After DFS processes node {node}, which nodes are in the visited set?",
        hint: "A node is added to the visited set as soon as it is discovered (when pushed onto the stack), not when it is popped."
    },
    {
        id: 7,
        type: "backtracking",
        text: "If DFS reaches node {node} and all its neighbors are already visited, what happens next?",
        hint: "When DFS cannot go deeper, it backtracks by popping the current node and returning to the previous node on the stack."
    },
    {
        id: 8,
        type: "structural_change",
        text: "If node {node} had an additional edge to node {extra}, how could this affect the DFS traversal?",
        hint: "DFS order depends on neighbor order. Adding an edge may cause DFS to explore a different path earlier."
    }
];