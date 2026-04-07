import cytoscape from "cytoscape";
import jsPDF from "jspdf";
import AlgorithmVisualizer from "../components/graphPanel/visualizationLogic/AlgorithmVisualizer";
import { captureDataPanel } from "./HTMLtoImage";

function createHeadlessCy(nodes, edges, style, directed) {
    const container = document.createElement("div");
    container.style.position = "fixed";
    document.body.appendChild(container);

    const cy = cytoscape({
        container,
        elements: [...nodes, ...edges],
        style: style(directed),
        layout: { name: "preset" }
    });

    return { cy, container };
}

async function addImageFit(pdf, img, x, y, maxWidth) {
    const props = pdf.getImageProperties(img);
    const height = (props.height * maxWidth) / props.width;
    pdf.addImage(img, "JPEG", x, y, maxWidth, height);
    return height;
}

export async function exportAlgorithmPDF(algoDef, nodes, edges, graphConfig, steps) {
    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 15;
    const gap = 10;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const usableWidth = pageWidth - margin * 2 - gap;
    const columnWidth = usableWidth / 2;

    const { cy, container } = createHeadlessCy(nodes, edges, algoDef.style, graphConfig.directed);
    const visualizer = new AlgorithmVisualizer(cy, new algoDef.AdapterClass(), algoDef.id);

    let y = 15;

    for (let i = 0; i < steps.length; i++) {
        const step = structuredClone(steps[i]);
        visualizer.renderStep(step);

        const graphImg = cy.jpg({ bg: "#fff", full: true, quality: 0.8 });
        const dataImg = await captureDataPanel(algoDef.DataPanel, step, algoDef.dataCss, i);

        const gh = pdf.getImageProperties(graphImg);
        const dh = pdf.getImageProperties(dataImg);
        const h = Math.max((gh.height * columnWidth) / gh.width,
                     (dh.height * columnWidth) / dh.width) + 15;

        if (y + h > pageHeight - 15) { pdf.addPage(); y = 20; }
        
        pdf.setFontSize(14).text(`Step ${i + 1}`, columnWidth + margin/2, y-5);
        await addImageFit(pdf, graphImg, margin, y, columnWidth);
        await addImageFit(pdf, dataImg, margin + columnWidth + gap, y, columnWidth);

        y += h + 5;
    }

    pdf.save(`${algoDef.id}-algorithm.pdf`);
    cy.destroy();
    container.remove();
}
