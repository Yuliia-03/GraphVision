export function formatGraphs(data) {
    return data.map(graph => ({
        name: graph.name,
        nodes: graph.nodes.map(n => ({
            data: {
                id: n.id,
                label: n.label
            },
            position: {
                x: n.x,
                y: n.y
            }
        })),
        edges: graph.edges.map(e => ({
            data: {
                id: e.id,
                source: e.source,
                target: e.target,
                weight: e.weight
            }
        }))
    }));
}