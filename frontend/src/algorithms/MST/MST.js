import BaseAlgorithm from "../BaseAlgorithm";
import {buildAdjacencyList} from "../adjacencyList"

export class DisjointSet {
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

        this.weight = 0;
        this.visitedEdges = new Set();
        this.mstTree = new Set();

        this.connectedNodes = new Set()
        this.inQueue = new Set()
        this.ignoredEdges = new Set()
        this.moments = []
        this.idToLabel = Object.fromEntries(nodes.map(n => [n.data.id, n.data.label]));
    
    }

    getLabel(id) {
        return this.idToLabel[id] || id;
    }

    // const edgeIdsToLabels = (edges) => edges?.map(edge => {
    //     if (typeof edge === "string" && edge.includes("-")) {
    //         const [fromId, toId] = edge.split("-");
    //         const fromLabel = idToLabel[fromId] ?? fromId;
    //         const toLabel = idToLabel[toId] ?? toId;
    //         return `${fromLabel}-${toLabel}`;
    //     }
    //     return edge;
    // });

    kruskals() {
    const uf = new DisjointSet(this.nodes.map(n => n.data.id));
    this.inQueue = this.edges.sort((a, b) => a.data.weight - b.data.weight).map(e=> e.data);

    while (this.mstTree.size < this.nodes.length - 1 && this.inQueue.length !== 0) {
        const currentEdge = this.inQueue.shift();
        const { source, target, weight, id } = currentEdge;

        // Step: edge is being considered
        this.addStep(`Choose edge ${this.getLabel(source)}-${this.getLabel(target)}`, {
            currentEdge: id,
            weight: this.weight,
            visitedEdges: [...this.visitedEdges],
            mstTree: [...this.mstTree],
            connectedNodes: [...this.connectedNodes]
        });
        this.recordMoment("edgeConsidered", { 
            currentEdge: id, 
            edgeSource: source.BaseAlgorithm,
            queue: this.inQueue
        });

        if (!uf.connected(source, target)) {
            // Union sets
            uf.union(source, target);

            this.weight += weight;
            this.visitedEdges.add(id);
            this.mstTree.add(id);
            this.connectedNodes.add(source);
            this.connectedNodes.add(target);

            // Step: edge added to MST
            this.addStep(`Add edge ${this.getLabel(source)}-${this.getLabel(target)}`, {
                currentEdge: id,
                weight: this.weight,
                visitedEdges: [...this.visitedEdges],
                mstTree: [...this.mstTree],
                connectedNodes: [...this.connectedNodes]
            });
            this.recordMoment("edgeAdded", { 
                currentEdge: id, 
                edgeSource: source,
                
            });
        } else {
            // Step: edge skipped (cycle)
            this.visitedEdges.add(id);
            this.addStep(`Skip edge ${this.getLabel(source)}-${this.getLabel(target)} (cycle)`, {
                currentEdge: id,
                weight: this.weight,
                visitedEdges: [...this.visitedEdges],
                mstTree: [...this.mstTree],
                connectedNodes: [...this.connectedNodes]
            });
            this.recordMoment("edgeSkipped", { 
                currentEdge: id, 
                edgeSource: source,
                queue: this.inQueue
            });
        }
    }

    // Step: MST completed
    this.addStep(`MST is completed`, {
        weight: this.weight,
        visitedEdges: [...this.visitedEdges],
        mstTree: [...this.mstTree],
        connectedNodes: [...this.connectedNodes]
    });
    this.recordMoment("mstCompleted");

    return { steps: this.steps, moments: this.moments };
}

    prims(source) {

        this.weight = 0
        this.currentNode = source
        this.inQueue = new Set()

        this.addStep(`Initialise with source node ${this.getLabel(source)}`, {
            currentNode: this.currentNode,
            weight: 0,
            mstTree: [],
            connectedNodes: [...this.connectedNodes],
            inQueue: []
        }); 

        this.recordMoment("startNode", { currentNode: this.currentNode });

        const graph = buildAdjacencyList(this.nodes, this.edges, this.directed);

        const neighbours = (graph[this.currentNode] || []).slice().sort((a,b) => a.weight - b.weight);

        this.inQueue = neighbours;
        this.connectedNodes.add(this.currentNode);

        this.addStep(`Mark ${this.getLabel(this.currentNode)} as visited and add adjacent edges to the queue`, {
            currentNode: this.currentNode,
            weight: 0,
            mstTree: [...this.visitedEdges],
            inQueue: [],
            connectedNodes: [...this.connectedNodes]
        });

        this.ignoredEdges = new Set()

        while (this.visitedEdges.size < this.nodes.length - 1 && this.inQueue.length != 0) {

            const neighbours = (graph[this.currentNode ] || []);

            const newEdges = new Set()
            for (const i of neighbours) {
                
                if(!this.connectedNodes.has(i.to)){
                    newEdges.add(i)
                } else {
                    this.ignoredEdges.add(i)
                }
            }

            newEdges.forEach(n => {
                if (!this.inQueue.includes(n)){
                this.inQueue.push(n)
                    }
            })

            this.inQueue.sort((a,b) => a.weight - b.weight);

            this.addStep(`New edges to add to the queue: ${[...newEdges].map((edge) => `${this.getLabel(edge.from)}-${this.getLabel(edge.to)}` )}`, {
                currentNode: this.currentNode,
                weight: this.weight,
                mstTree: [...this.mstTree],
                inQueue: this.inQueue.map((edge) => edge.id),
                connectedNodes: [...this.connectedNodes],
                ignore: [...this.ignoredEdges]
            });

            this.recordMoment("queueUpdated", { currentNode: this.currentNode, queueAfter: [...this.inQueue] });

            const currentEdge = this.inQueue.shift();

            if(this.connectedNodes.has(currentEdge.from) && this.connectedNodes.has(currentEdge.to)) {
                this.recordMoment("edgeSkipped", { currentEdge: currentEdge.id });
                continue
            }
            this.weight += currentEdge.weight;

            const nextNode = currentEdge.to;
            this.visitedEdges.add(`${currentEdge.from}-${nextNode}`);
            this.mstTree.add(`${currentEdge.id}`);

            this.addStep(`Select ${currentEdge.from}-${nextNode} as with min weight`, {
                currentNode: this.currentNode,
                weight: this.weight,
                mstTree: [...this.mstTree],
                inQueue: this.inQueue.map((edge) => edge.id),
                connectedNodes: [...this.connectedNodes]
            });

            this.recordMoment("edgeSelected", { currentEdge: currentEdge.id });

            this.currentNode = nextNode
            this.connectedNodes.add(this.currentNode );

            this.addStep(`Visit node ${this.getLabel(this.currentNode)} to MST. Inspect it's adjacent edges `, {
                currentNode: this.currentNode,
                weight: this.weight,
                mstTree: [...this.mstTree],
                inQueue: this.inQueue.map((edge) => `${edge.id}`),
                connectedNodes: [...this.connectedNodes]
            });

            this.recordMoment("nodeVisited", { currentNode: this.currentNode, currentEdge: currentEdge.id });
        }

        this.addStep(`MST completed: `, {
                currentNode: this.currentNode,
                weight: this.weight,
                mstTree: [...this.mstTree],
                inQueue: [],
                connectedNodes: [...this.connectedNodes],
                ignore: this.inQueue.map((edge) => edge.id),
            });

        this.recordMoment("mstCompleted");

        return {steps: this.steps,
            moments: this.moments}

    }

    recordMoment(type, data = {}) {
        const snapshotQueue = 
            [...this.inQueue].map(e => ({
                id: e.id,
                from: e.from || e.source,
                to: e.to || e.target,
                weight: e.weight
            }));

        this.moments.push({
            type,
            node: data.currentNode ?? null,
            edge: data.currentEdge ?? null,
            mstTree: [...this.mstTree],
            connectedNodes: [...this.connectedNodes],
            queue: snapshotQueue || [],
            weight: this.weight ?? 0
        });
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