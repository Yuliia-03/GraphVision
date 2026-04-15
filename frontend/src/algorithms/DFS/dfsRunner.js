import { buildAdjacencyList } from "../adjacencyList";

export default class DFSRunner {

    constructor(nodes, edges, graphConfig) {
        this.nodes = nodes;
        this.edges = edges;
        this.graphConfig = graphConfig;
        this.directed = graphConfig.directed || false;

        this.stack = [];
        this.visited = new Set();

        this.moments = [];

        this.currentEdges = [];
        this.currentNeighbours = [];

        this.dfsOrder = [];

        this.events = {};
    }

    on(event, callback) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    }

    emit(event, payload) {
        if (!this.events[event]) return;
        this.events[event].forEach(cb => cb(payload));
    }

    run(source, externalVisited = new Set()) {
        const graph = buildAdjacencyList(this.nodes, this.edges, this.directed);
        
        this.steps = [];
        this.stack = [];
        this.visited = new Set(externalVisited);
        this.moments = [];

        if (this.visited.has(source)) return;

        let shouldStop = false;
        const stop = () => (shouldStop = true);

        this.stack.push(source);

        this.visited.add(source);
        console.log("dfs")
        console.group(source)
        this.emit("init", { source });

        while (this.stack.length > 0 && !shouldStop) {

            const current = this.stack.pop();

            const moment = {
                node: current,
                stackBefore: [current, ...this.stack],
                visitedBefore: [...this.visited],
                discovered: [],
                edgesLeadingToNew: [],
                allNeighbours: []
            };

            this.dfsOrder.push(current);

            this.emit("pop", { current });

            const neighbours = graph[current] || [];

            for (const { to } of neighbours) {

                moment.allNeighbours.push(to);

                const edge = `${current}-${to}`;
                this.currentEdges.push(edge);
                if (!this.directed) this.currentEdges.push(`${to}-${current}`);
                this.currentNeighbours.push(to);

                this.emit("edge", { current, to });

                if (!this.visited.has(to) && !shouldStop) {

                    this.stack.push(to);

                    this.visited.add(to);

                    moment.discovered.push(to);
                    moment.edgesLeadingToNew.push(edge);

                    this.emit("discover", { current, to, stop });
                    
                }
            }

            moment.stackAfter = [...this.stack];
            moment.visitedAfter = [...this.visited];

            this.moments.push(moment);

            this.currentEdges = [];
            this.currentNeighbours = [];
        }

        this.emit("done", {});
    }
}