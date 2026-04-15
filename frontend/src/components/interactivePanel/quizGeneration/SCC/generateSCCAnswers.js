export default function generateSCCAnswers(questions, steps, moments, edges) {

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const unique = (arr) =>
    [...new Set(arr.map(x => JSON.stringify(x)))].map(JSON.parse);

  return questions.map(q => {

    const m = moments[q.momentIndex];
    const next = moments[q.momentIndex + 1];

    const node = m.node || m.current;

    let answer;
    let options = [];

    switch (q.id) {

      // 1. next node
      case 1: {
        const nextDiscover = m.type === "discover" && m.node !== next.node
          ? next.current
          : `No more nodes do explore from ${m.node}. Backtrack.`;
        if (m.phase === "secondDFS" && m.visited.includes(m.neighbours)) {
            answer = `No more nodes to explore in current component. Finish DFS of current component`
        } else {
            answer = nextDiscover || `No more nodes to explore in current component. Finish DFS of current component`
        }
          
        options = shuffle(unique([
          answer ?? [],
          m.stackBefore.at(-1) != m.neighbours[0] ? m.neighbours[0] ||  answer: answer,
          node ?? [],
          ...m.neighbours,
          `No more nodes to explore in current component. Finish DFS of current component`,
          `No more nodes do explore from ${m.node}. Backtrack.`
        ]));

        break;
      }

      // 2. stack state
      case 2: {
        answer = m.stackAfter || [];

        options = shuffle(unique([
          answer,
          m.stackBefore || [],
          (m.stackBefore || []).slice(0, -1),
          (m.stackAfter || []).slice(0, -1),
          [...m.neighbours],
          next.stackAfter,
          [node],
          m.visited
        ]));

        break;
      }
      // 3. update visited
      case 3: {
        answer = next.visited || next.visitedAfter
        options = shuffle(unique([
          answer,
          next?.visited || [],
          [...m.neighbours],
          [...m.stackAfter],
          [...m.stackBefore],
          [...m.visited],
          []
        ]));

        break;
      }

      // 4. backtrack
      case 4: {
        answer = `Pop ${m.node} from stack → stack after: [${(m.stackAfter || []).join(", ")}]`;

        options = shuffle(unique([
          answer,
          `Push ${node} into stack`,
          `Remove from visited`,
          `Restart DFS`
        ]));

        break;
      }
      case 7: {
        answer = "To explore strongly connected components using decreasing finish time"
        options = shuffle(unique([
          answer,
          "To remove cycles from the graph",
          "To make the graph undirected",
          "To sort graph nodes"
        ]));

        break;
      }

      // edges to new nodes
      case 6: {
        const newNeighbours = m.neighbours?.filter(e=> !m.visited.includes(e))
        answer = newNeighbours.map(e=> `${m.node}-${e}`)
        
        const visitedNeighbours = m.neighbours?.filter(e=> m.visited.includes(e))
        const distractor1 = visitedNeighbours?.map(e=> `${m.node}-${e}`);
        console.log(distractor1)

        options = shuffle(unique([
          answer,
          distractor1,
          [],
          distractor1.slice(0,-1)|| [],
          edges.filter(e=> e.data.target===node).map(e=> `${e.data.source}-${node}`)
        ]));
        break;
      }
        case 17:{
        answer = m.type === "discover" ? `Add ${node} to the stack. Inspect its unvisited neighbours` : `Backtrack from ${node}`;

        options = shuffle(unique([
          answer,
          "Transpose graph",
          `Remove ${node} from the set of visited nodes`,
          `Backtrack from ${node}`,
          `Add ${node} to the stack. Inspect its unvisited neighbours`,
        ]));

        break;
      }

      // =========================
      // 7. WHY TRANSPOSE
      // =========================
      case 7:
             {
        answer = "To enable SCC discovery using finish order";

        options = [
          answer,
          "To randomize DFS",
          "To remove cycles",
          "To sort nodes alphabetically"
        ];

        break;
      }

      // =========================
      // 8. SECOND DFS START
      // =========================
      case 8: {
        answer = "Start building a strongly connected component";

        options = [
          answer,
          "Find shortest path",
          "Detect cycle only",
          "Restart DFS"
        ];

        break;
      }

      // =========================
      // 9. COMPONENT BUILD
      // =========================
      case 9: {
        const component = m.stackAfter || [];

        answer = component;

        options = shuffle(unique([
          answer,
          m.stackBefore || [],
          m.visited || [],
          []
        ]));

        break;
      }

      // =========================
      // 10. COMPONENT COMPLETE
      // =========================
      case 10: {
        answer = "A strongly connected component is completed";

        options = [
          answer,
          "Graph is acyclic",
          "DFS failed",
          "Edges removed"
        ];

        break;
      }

      // =========================
      // 11. SECOND DFS NEXT
      // =========================
      case 11: {
        const candidates = m.neighbours || [];

        answer = node || "No more nodes left to explore"

        options = shuffle(unique([
          answer ?? [],
          next.node,
          "No more nodes left to explore",
          m.finishOrder[0],
          m.finishOrder.at(-1)
        ]));

        break;
      }

      // =========================
      // 13. SCC PROPERTY
      // =========================
      case 13: {
        answer = "Nodes in SCC are mutually reachable";

        options = [
          answer,
          "Graph is a tree",
          "Nodes are isolated",
          "Edges are missing"
        ];

        break;
      }

      // =========================
      // 15. FINAL OUTPUT
      // =========================
      case 15: {
        answer = "List of all SCCs";

        options = [
          answer,
          "Single path",
          "Tree structure",
          "Edge list"
        ];

        break;
      }

      // =========================
      default: {
        answer = "Unknown";
        options = ["Unknown"];
      }
    }

    return {
      ...q,
      answer,
      options: shuffle(options)
    };
  });
}