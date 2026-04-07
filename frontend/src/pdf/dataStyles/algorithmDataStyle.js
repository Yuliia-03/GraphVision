const AlgoDataStyle = `
.data-panel {
  font-family: Arial, sans-serif;
  padding: 10px;
  background: #ffffff;
  color: #222;
}

.block {
  margin-bottom: 12px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.block p {
  margin: 4px 0;
  font-size: 12px;
}

.node-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.node-chip {
  padding: 4px 8px;
  border-radius: 12px;
  background: #f0f0f0;
  font-size: 11px;
  border: 1px solid #ccc;
}

.node-chip.front {
  background: #ffe08a;
  border-color: #f0b400;
  font-weight: bold;
}

.node-chip.visited {
  background: #d1f5d3;
  border-color: #4caf50;
}

.block.result {
  background: #f9fafb;
  border-left: 4px solid #4caf50;
}

.block.result h3 {
  margin-top: 0;
  font-size: 14px;
}
`;

export default AlgoDataStyle;
