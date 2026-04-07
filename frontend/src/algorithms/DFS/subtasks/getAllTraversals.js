import { buildAdjacencyList } from "../../adjacencyList";

export function getAllDFSTraversals(nodes, edges, directed, start) {

    const graph = buildAdjacencyList(nodes, edges, directed);
    const results = [];

    function dfs(stack, visited, order) {

        if (order.length === nodes.length) {
            results.push([...order]);
            return;
        }

        if (stack.length === 0) return;

        const current = stack[stack.length - 1];

        const neighbours = (graph[current] || [])
            .map(n => n.to)
            .filter(n => !visited.has(n));

        if (neighbours.length === 0) {
            // backtrack
            dfs(stack.slice(0, -1), visited, order);
            return;
        }

        // branch on ALL possible next choices
        for (const next of neighbours) {
            const newVisited = new Set(visited);
            newVisited.add(next);

            dfs(
                [...stack, next],
                newVisited,
                [...order, next]
            );
        }
    }

    dfs([start], new Set([start]), [start]);

    return results;
}