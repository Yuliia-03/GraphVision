const mstDataStyle = `
.mst-data-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    margin-top: 1rem;
    background: #ffffff;
    border-radius: 14px;

    font-size: 0.9rem;
    border: 1px solid #e5e7eb;
    color: #1e293b;
    font-family: Arial, sans-serif;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.edge-chip {
    padding: 0.25rem 0.6rem;
    margin: 0.15rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-family: "JetBrains Mono", monospace;
    background: #fef3c7;
    color: #92400e;
    border: 1px solid #fde68a;
    white-space: nowrap;
}

.weight {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.9rem;
    color: #be123c;
}


.block {
  margin-bottom: 0.5rem;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.block p {
  margin: 4px 0;
}

.mst-data-panel .block.inline {
    display: flex;
    align-items: center;
    gap: 0.9rem;
}

.mst-data-panel .block.inline p {
    margin: 0;
}


.node-list {
  display: flex;
  flex-wrap: wrap;
}
`;

export default mstDataStyle;
