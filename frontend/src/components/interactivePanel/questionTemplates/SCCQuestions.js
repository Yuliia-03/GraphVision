export const sccTemplates = [

    // ========================
    // FIRST DFS (finish order)
    // ========================

    {
        id: 1,
        type: "finish_order_update",
        text: "DFS just finished exploring from {node}. Current finish order: {finishOrder}. What will it be after adding {node}?",
        hint: "A node is added to the finish order AFTER all its reachable nodes are explored."
    },

    {
        id: 2,
        type: "first_dfs_next",
        text: "Current node: {node}. Visited: {visited}. Which node will DFS visit next?",
        hint: "DFS continues to an unvisited neighbour if one exists."
    },

    {
        id: 3,
        type: "stack_behavior_first",
        text: "Current stack: {inStack}. After processing node {node}, what will the stack look like?",
        hint: "DFS pops the current node, then pushes any unvisited neighbours."
    },

    {
        id: 4,
        type: "visited_first_dfs",
        text: "Visited nodes: {visited}. After the next step, what will the visited set be?",
        hint: "Nodes are marked visited as soon as they are discovered."
    },

    {
        id: 5,
        type: "finish_order_reason",
        text: "Why is node {node} added to the finish order now?",
        hint: "Because DFS has fully explored all paths starting from this node."
    },

    // ========================
    // TRANSPOSITION
    // ========================

    {
        id: 6,
        type: "transpose_effect",
        text: "The graph is transposed. What changes about the edges?",
        hint: "All edges are reversed."
    },

    {
        id: 7,
        type: "transpose_purpose",
        text: "Why do we transpose the graph before the second DFS?",
        hint: "This allows DFS to collect strongly connected components correctly."
    },

    // ========================
    // SECOND DFS (components)
    // ========================

    {
        id: 8,
        type: "second_dfs_start",
        text: "We start DFS from node {node} (based on finish order). Why this node?",
        hint: "Nodes are processed in decreasing finish time."
    },

    {
        id: 9,
        type: "component_growth",
        text: "Current component: {component}. After visiting neighbours of {node}, which nodes will be added?",
        hint: "Only reachable nodes in the transposed graph that are not yet visited."
    },

    {
        id: 10,
        type: "second_stack_behavior",
        text: "Current stack: {inStack}. After processing node {node}, what will the stack contain?",
        hint: "Similar to DFS: pop current, push unvisited neighbours."
    },

    {
        id: 11,
        type: "component_completion",
        text: "DFS finished from node {node}. What strongly connected component was found?",
        hint: "All nodes reached in this DFS form one SCC."
    },

    {
        id: 12,
        type: "visited_second_dfs",
        text: "Visited nodes so far: {visited}. Which nodes will be marked visited after this step?",
        hint: "All nodes discovered in this DFS become visited."
    },

    // ========================
    // FINAL RESULT
    // ========================

    {
        id: 13,
        type: "final_components",
        text: "The algorithm produced components: {components}. Are these valid SCCs?",
        hint: "Each SCC must be mutually reachable."
    },

    {
        id: 14,
        type: "component_order",
        text: "In what order are SCCs discovered and why?",
        hint: "They follow decreasing finish times from the first DFS."
    },

    {
        id: 15,
        type: "structural_change",
        text: "If we add an edge between two SCCs, how could the result change?",
        hint: "It might merge two SCCs into one if a cycle is formed."
    }
];