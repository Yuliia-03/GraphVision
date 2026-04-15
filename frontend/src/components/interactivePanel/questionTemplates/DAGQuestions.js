
// DAG + Topological Sort Question Templates
// (Context-based, state-driven)

export const dagTemplates = [

    {
        id: 1,
        type: "next_node",
        text: "Current node: {node}. Visited: {visited}. Assuming we visit nodes in an ascendic order, which node will DFS visit next?",
        hint: "Recursive DFS selects an unvisited neighbour of the current node."
    },

    {
        id: 2,
        type: "rec_stack_push",
        text: "Current recursion stack: {recStack}. We already visited nodes {visited}. After the next DFS step, what will the recursion stack look like?",
        hint: "Think about what DFS does next: if there is an unvisited neighbour, it goes deeper (push). Otherwise, it backtracks (pop)."
    },

    {
        id: 3,
        type: "visited_update",
        text: "Visited nodes: {visited}. After recursive DFS visits the next node, what will the visited set be?",
        hint: "Each visited node is immediately added to the visited set."
    },

    {
        id: 10,
        type: "valid_next_nodes",
        text: "Current node: {node}. Visited: {visited}. Which of the following nodes can be visited next?",
        hint: "Only neighbours of {node} that are NOT in visited yet can be chosen."
    },


    {
        id: 4,
        type: "backtrack_action",
        text: "Current node: {node}. Visited nodes: {visited}. What happens next?",
        hint: "DFS backtracks by popping the current node from the recursion stack."
    },

    {
        id: 5,
        type: "stack_after_pop",
        text: "Current recursion stack: {recStack}, {node}. After backtracking from node {node}, what will the stack be?",
        hint: "The last node is removed from the recursion stack."
    },

    {
        id: 7,
        type: "cycle_detection",
        text: "Current recursion stack: {recStack}. If we encounter an edge to a node already in this stack, what does it indicate?",
        hint: "This indicates a back edge, which forms a cycle."
    },

    {
        id: 8,
        type: "cycle_result",
        text: "A cycle {cycle} is detected. What will the algorithm do next?",
        hint: "Topological sort stops because it is not possible on cyclic graphs."
    }
];

export const topoTemplates = [
  {
    id: 6,
    text: "Current topo list: {topoOrder}. After finishing node {node}, what will it be?",
    hint: "Nodes are added after exploring all neighbours."
  },
  {
    id: 9,
    text: "Topo list after we visited the last node is {topoOrder}. What will be the final order?",
    hint: "Reverse the list."
  }
  
];