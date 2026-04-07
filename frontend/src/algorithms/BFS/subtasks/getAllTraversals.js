
import { buildAdjacencyList } from "../../adjacencyList";

export function getAllBFSTraversals(nodes, edges, directed, source) {
    const graph = buildAdjacencyList(nodes, edges, directed);
    const results = [];

    const permute = (arr) => {
        if (arr.length <= 1) return [arr];
        return arr.flatMap((v, i) =>
            permute([...arr.slice(0, i), ...arr.slice(i + 1)])
                .map(p => [v, ...p])
        );
    };

    const bfsBacktrack = (queue, visited, order) => {
        if (queue.length === 0) {
            results.push([...order]);
            return;
        }

        const current = queue[0];
        const restQueue = queue.slice(1);

        const neighbors = (graph[current] || [])
            .map(e => e.to)
            .filter(v => !visited.has(v));

        if (neighbors.length === 0) {
            bfsBacktrack(restQueue, visited, [...order, current]);
            return;
        }

        for (const perm of permute(neighbors)) {
            const newVisited = new Set(visited);
            perm.forEach(v => newVisited.add(v));

            bfsBacktrack(
                [...restQueue, ...perm],
                newVisited,
                [...order, current]
            );
        }
    };

    console.log(results)

    bfsBacktrack([source], new Set([source]), []);
    return results;
}