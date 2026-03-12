export const formatNodesForAPI = (nodes) =>
    nodes.map(n => ({
        id: n.data.id,
        label: n.data.label,
        x: n.position.x,
        y: n.position.y
    }));

export const formatEdgesForAPI = (edges) =>
    edges.map(e => ({
        id: e.data.id,
        source: e.data.source,
        target: e.data.target,
        weight: e.data.weight? e.data.weight : 1
    }));