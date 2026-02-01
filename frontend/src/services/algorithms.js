
export const Algorithms = {

  MST: {
    name: "Minimum Spanning Tree",
    allowsDirected: false,
    allowsUndirected: true,
    requiresWeighted: true

  },

  BFS: {
    name: "Breadth-First Search",
    allowsDirected: true,
    allowsUndirected: true,
    requiresWeighted: false
  },

  DFS: {
    name: "Depth-First Search",  
    allowsDirected: true,
    allowsUndirected: true,
    requiresWeighted: false
  },

  DAG: {
    name: "Direct Acyclic Graph",
    allowsDirected: true,
    allowsUndirected: false,
    requiresWeighted: false
  },

  Top_sort: {
    name: "Topological Sort",
    allowsDirected: true,
    allowsUndirected: false,
    requiresWeighted: false
  },
  
  SCC: {
    name: "Strongly Connected Components",
    allowsDirected: true,
    allowsUndirected: false,
    requiresWeighted: false
  },
};