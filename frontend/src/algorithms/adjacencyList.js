export function buildAdjacencyList(nodes, edges, directed) {
    const graph = {};

    nodes.forEach(n => {
        graph[n.data.id] = [];
    });

    edges.forEach(e => {
        const { id, source, target, weight = 1 } = e.data;

        graph[source].push({
            id: id,
            from: source,
            to: target,
            weight
        });

        if (!directed) {
            graph[target].push({
                id: id,
                from: target,
                to: source,
                weight
            });
        }
    });

    return graph;
}
