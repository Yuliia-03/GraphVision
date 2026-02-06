import BaseAlgorithm from "./BaseAlgorithm";


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
    }

    kruskals() {
        console.log("kruskals")
        const uf = new DisjointSet(this.nodes.map(n => n.data.id)) 
        this.edges.sort((a, b) => a.data.weight - b.data.weight);

        this.addStep(`Choose first edge ${this.edges[0].id}`, {
            currentEdge: this.edges[0]
        });

        while (this.visitedEdges.size < this.nodes.length - 1) {
            const currentEdge = this.edges.shift();
            console.log(currentEdge)
            const { source, target, weight, id } = currentEdge.data;
            

            if(!uf.connected(source, target)) {
                uf.union(source, target);
                console.log(`new edge ${id}`)

                this.currentWeight += weight;
                this.visitedEdges.add(id);

                this.addStep(`Add edge ${id}`, {
                    currentEdge: currentEdge,
                    visitedEdges: [...this.visitedEdges]
                });
            } else{
                console.log(`edge ${id} form a cycle` )
                this.addStep(`Skip edge ${id} (cycle)`, {
                    currentEdge: currentEdge
                });
            }
            
        }
        console.log(this.steps)
        console.log(this.currentWeight)

        return this.steps
    }

    prims() {
        // implement Prim's algorithm
    }

    run(params) {

        const { task } = params;
        
        switch(task) {
            case "kruskals":
                return this.kruskals();
            case "prims":
                return this.prims();
        }

    }



}

