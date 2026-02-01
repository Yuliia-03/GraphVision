
export function addEdge(edges, newEdge, directed) {
    let { source, target } = newEdge.data;

    if (!directed) {
        [source, target] = [source, target].sort();
    }

    const exists = edges.some(
        (e) =>
        e.data.source === source &&
        e.data.target === target
    );

    if (exists) return edges;

    return [
        ...edges,
        {
        ...newEdge,
        data: {
            ...newEdge.data,
            source: source,
            target: target,
            id: `${source}-${target}`
        }
        }
    ];
}
