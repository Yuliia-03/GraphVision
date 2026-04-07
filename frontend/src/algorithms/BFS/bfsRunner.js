import { buildAdjacencyList } from "../adjacencyList";

export default class BFSRunner {
    
    constructor(nodes, edges, graphConfig) {
        this.nodes = nodes;
        this.edges = edges;
        this.graphConfig = graphConfig;
        this.directed = graphConfig.directed || false;

        this.queue = [];
        this.visited = new Set();
        this.currentNeighbours = [];
        this.currentEdges = [];

        this.bfs = ""; 
        this.moments = []; // for quiz/visualization

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

    run(source) {
        const graph = buildAdjacencyList(this.nodes, this.edges, this.directed);
        this.queue = [];
        this.visited = new Set();

        let shouldStop = false;
        const stop = () => (shouldStop = true);

        // init
        this.queue.push(source);
        this.visited.add(source);
        this.emit("init", { source });

        while (this.queue.length > 0 && !shouldStop) {
            const current = this.queue.shift();

            const moment = {
                node: current,
                queueBefore: [current, ...this.queue],
                visitedBefore: [...this.visited],
                discovered: [],
                edgesLeadingToNew: [],
                allNeighbours: []
            };

            this.bfs += this.bfs.length ? ` -> ${current}` : `${current}`;
            this.emit("pop", { current });

            const neighbours = graph[current] || [];

            this.emit("inspect", { current, neighbours });

            for (const { to } of neighbours) {
                moment.allNeighbours.push(to);

                const edge = `${current}-${to}`;
                this.currentEdges.push(edge);
                if (!this.directed) this.currentEdges.push(`${to}-${current}`);
                this.currentNeighbours.push(to);

                this.emit("edge", { current, to });

                if (!this.visited.has(to) && !shouldStop) {
                    this.queue.push(to);
                    this.visited.add(to);

                    moment.discovered.push(to);
                    moment.edgesLeadingToNew.push(`${current}-${to}`);

                    this.emit("discover", { current, to, stop });
                }
            }

            moment.queueAfter = [...this.queue];
            moment.visitedAfter = [...this.visited];
            this.moments.push(moment);

            // reset current edges/neighbours for next iteration
            this.currentEdges = [];
            this.currentNeighbours = [];
        }

        this.emit("done", {});
    }
}