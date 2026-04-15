export const sccTemplates = [

    //  dfs (discover flow)
    {
        id: 1,
        type: "next_node",
        phase: "firstDFS",
        allowedMomentType: "discover",
        text: "Current node: {node}. Visited: {visited}. Assuming we visit nodes in an ascendic order, which node will DFS visit next?",
        hint: "DFS goes deeper before backtracking."
    },

    {
        id: 2,
        type: "rec_stack_push",
        phase: "firstDFS",
        allowedMomentType: "discover",
        text: "Current recursion stack: {recStack}. We already visited nodes {visitedBefore}. After the next DFS step, what will the recursion stack look like?",
        hint: "DFS pushes nodes when going deeper"
    },

    {
        id: 3,
        type: "visited_update",
        phase: "firstDFS",
        allowedMomentType: "discover",
        text: "Current node: {node}. Visited nodes: {visited}. Recursion stack: {recStackAfter}. After recursive DFS perform next step, what will the visited set be?",
        hint: "Visited updates immediately when node is discovered."
    },

    {
        id: 4,
        type: "backtrack_action",
        phase: "firstDFS",
        allowedMomentType: "backtrack",
        text: "Node {node} has no unvisited neighbours. What happens next?",
        hint: "DFS backtracks and pushes node to finish stack."
    },

    {
        id: 6,
        type: "edges_explored",
        phase: "firstDFS",
        allowedMomentType: "discover",
        text: "From node {node}, which edges lead to NEW nodes?",
        hint: "Only edges to unvisited nodes matter."
    },
    // transpose phase

    {
        id: 7,
        type: "transpose_reason",
        phase: "transpose",
        text: "Why transpose the graph in Kosaraju's algorithm?",
        hint: "To process SCCs in finish order."
    },

    {
        id: 11,
        type: "secondDFS_next",
        text: "Visited nodes: {visitedBefore}. Finish order: {finOrder} According to the finishing order, which node will start the next DFS?",
        hint: "Pick the next unvisited node from the top of the finishing stack."
    },
    // component completion

    {
        id: 10,
        type: "component_complete",
        phase: "componentFound",
        text: "Component {component} is complete. What does it represent?",
        hint: "A strongly connected component."
    },

    {
        id: 13,
        type: "scc_property",
        phase: "componentFound",
        text: "Nodes in {component} are mutually reachable. What does this imply?",
        hint: "They form an SCC."
    },

    {
        id: 15,
        type: "finished",
        phase: "finished",
        text: "All SCCs found: {sccs}. What does the algorithm return?",
        hint: "Partition of graph into SCCs."
    },
    {
        id: 17,
        type: "backtrack_action",
        phase: "firstDFS",
        allowedMomentType: "backtrack",
        text: "Current node: {node}. Visited nodes: {visited}. Recursion stack: {recStack}. What happens next?",
        hint: "DFS pops the current node when returning."
    }
];