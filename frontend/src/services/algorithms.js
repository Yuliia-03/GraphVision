
export const Algorithms = {

  MST: {
    name: "Minimum Spanning Tree",
    allowSelfLoops: false,
    allowsDirected: false,
    allowsUndirected: true,
    requiresWeighted: true

  },

  BFS: {
    name: "Breadth-First Search",
    allowSelfLoops: true,
    allowsDirected: true,
    allowsUndirected: true,
    requiresWeighted: false
  },

  DFS: {
    name: "Depth-First Search",  
    allowSelfLoops: true,
    allowsDirected: true,
    allowsUndirected: true,
    requiresWeighted: false
  },

  DAG: {
    name: "Direct Acyclic Graph",
    allowSelfLoops: false,
    allowsDirected: true,
    allowsUndirected: false,
    requiresWeighted: false
  },

  Top_sort: {
    name: "Topological Sort",
    allowSelfLoops: false,
    allowsDirected: true,
    allowsUndirected: false,
    requiresWeighted: false
  },
  
  SCC: {
    name: "Strongly Connected Components",
    allowSelfLoops: true,
    allowsDirected: true,
    allowsUndirected: false,
    requiresWeighted: false
  },
};