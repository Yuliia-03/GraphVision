export function buildAdjacencyList(nodes, edges, directed) {
    const graph = {};

    nodes.forEach(n => {
        graph[n.data.id] = [];
    });

    edges.forEach(e => {
        const { source, target, weight = 1 } = e.data;

        graph[source].push({
        to: target,
        weight
        });

        if (!directed) {
            graph[target].push({
                to: source,
                weight
            });
        }
    });

    return graph;
}
