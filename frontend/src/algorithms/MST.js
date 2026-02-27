import BaseAlgorithm from "./BaseAlgorithm";
import {buildAdjacencyList} from "./adjacencyList"

class DisjointSet {
    constructor(nodes) {
        this.parent = {};
        this.rank = {};
        nodes.forEach(n => {
            this.parent[n] = n;
            this.rank[n] = 0;
        });
    }

    find(node) {
        if (this.parent[node] !== node) {
            this.parent[node] = this.find(this.parent[node]);
        }
        return this.parent[node];
    }

    union (node1, node2){
        const root1 = this.find(node1);
        const root2 = this.find(node2);

        if(root1 === root2) return;

        if (this.rank[root1] < this.rank[root2]) {
            this.parent[root1] = root2;
        } else if(this.rank[root1] > this.rank[root2]) {
            this.parent[root2] = root1;
        } else {
            this.parent[root2] = root1;
            this.rank[root1]++;
        }
    }

    connected(node1, node2) {
    return this.find(node1) === this.find(node2);
  }
}

export default class MSTAlgorithm extends BaseAlgorithm{
    
    constructor(nodes, edges) {

        super(nodes, edges)

        console.log("constructor")
        this.currentWeight = 0;
        this.visitedEdges = new Set();
        this.mstTree = new Set();

        this.connectedNodes = new Set()
    }

    kruskals() {
        
        const uf = new DisjointSet(this.nodes.map(n => n.data.id)) 
        this.edges.sort((a, b) => a.data.weight - b.data.weight);

        while (this.mstTree.size < this.nodes.length - 1 && this.edges.length!=0) {
            const currentEdge = this.edges.shift();
            const { source, target, weight, id } = currentEdge.data;

            this.addStep(`Choose edge ${currentEdge.data.id}`, {
                currentEdge: currentEdge.data.id,
                weight: this.currentWeight,
                visitedEdges: [...this.visitedEdges],
                mstTree: [...this.mstTree],
                mstNodes: [...this.connectedNodes]
            });
            

            if(!uf.connected(source, target)) {
                uf.union(source, target);

                this.currentWeight += weight;
                this.visitedEdges.add(id);
                this.mstTree.add(id);
                this.connectedNodes.add(currentEdge.data.source);
                this.connectedNodes.add(currentEdge.data.target);

                this.addStep(`Add edge ${id}`, {
                    currentEdge: currentEdge.data.id,
                    weight: this.currentWeight,
                    visitedEdges: [...this.visitedEdges],
                    mstTree: [...this.mstTree],
                    mstNodes: [...this.connectedNodes]
                });
            } else {

                this.visitedEdges.add(id);
                this.addStep(`Skip edge ${id} (cycle)`, {
                    currentEdge: currentEdge.data.id,
                    weight: this.currentWeight,
                    visitedEdges: [...this.visitedEdges],
                    mstNodes: [...this.connectedNodes],
                    mstTree: [...this.mstTree]
                });
            }
            
        }
        
        this.addStep(`MST is completed`, {
                weight: this.currentWeight,
                visitedEdges: [...this.visitedEdges],
                mstTree: [...this.mstTree],
                mstNodes: [...this.connectedNodes]
            });

        return this.steps
    }

    prims(source) {

        this.weight = 0
        this.currentNode = source
        this.inQueue = []
        this.queueEdges = []

        this.addStep(`Initialise with source node ${source}`, {
            currentNode: this.currentNode,
            weight: 0,
            mstTree: [],
            mstNodes: [...this.connectedNodes],
            inQueue: []
        }); 
        const graph = buildAdjacencyList(this.nodes, this.edges, this.directed);

        const neighbours = (graph[this.currentNode] || []).slice().sort((a,b) => a.weight - b.weight);

        this.inQueue = neighbours;
        neighbours.forEach((edge) => this.queueEdges.push(`${edge.id}`))
        this.connectedNodes.add(this.currentNode);

        this.addStep(`Mark ${this.currentNode} as visited and add adjacent edges to the queue`, {
            currentNode: this.currentNode,
            weight: 0,
            mstTree: [...this.visitedEdges],
            inQueue: [...this.queueEdges],
            mstNodes: [...this.connectedNodes]
        });

        this.ignoredEdges = new Set()

        while (this.visitedEdges.size < this.nodes.length - 1 && this.inQueue.length != 0) {
            const currentEdge = this.inQueue.shift();
            this.weight += currentEdge.weight;
            const nextNode = currentEdge.to;
            this.visitedEdges.add(`${currentEdge.from}-${nextNode}`);


            this.mstTree.add(`${currentEdge.id}`);
            // this.mstTree.add(`${nextNode}-${currentEdge.from}`);

            this.addStep(`Select ${currentEdge.from}-${nextNode} as with min weight`, {
                currentNode: this.currentNode,
                weight: this.weight,
                mstTree: [...this.mstTree],
                inQueue: [...this.queueEdges],
                mstNodes: [...this.connectedNodes]
            });

            this.currentNode = nextNode
            this.connectedNodes.add(this.currentNode );

            this.addStep(`Visit node ${this.currentNode} to MST. Inspect it's adjacent edges `, {
                currentNode: this.currentNode,
                weight: this.weight,
                mstTree: [...this.mstTree],
                inQueue: [...this.queueEdges],
                mstNodes: [...this.connectedNodes]
            });

            const neighbours = (graph[this.currentNode ] || []);

            const newEdges = new Set()
            for (const i of neighbours) {
                
                if(!this.connectedNodes.has(i.to)){
                    newEdges.add(i)
                } else {
                    this.ignoredEdges.add(i)
                }
            }

            newEdges.forEach(n => this.inQueue.push(n))
            newEdges.forEach((edge) => this.queueEdges.push(`${edge.id}`))
            // newEdges.forEach((edge) => this.queueEdges.push(`${edge.to}-${this.currentNode}`))

            this.addStep(`New edges to add to the queue: `, {
                currentNode: this.currentNode,
                weight: this.weight,
                mstTree: [...this.mstTree],
                inQueue: [...this.queueEdges],
                mstNodes: [...this.connectedNodes],
                ignore: [...this.ignoredEdges]
            });
            
            this.inQueue.sort((a,b) => a.weight - b.weight);
        
        }

        this.addStep(`MST completed: `, {
                currentNode: this.currentNode,
                weight: this.weight,
                mstTree: [...this.mstTree],
                inQueue: [],
                mstNodes: [...this.connectedNodes],
                ignore: [...this.queueEdges]
            });

        return this.steps;

    }

    run(params) {

        const { task, startNode } = params;
        
        switch(task) {
            case "kruskals":
                return this.kruskals();
            case "prims":
                return this.prims(startNode);
        }

    }



}

