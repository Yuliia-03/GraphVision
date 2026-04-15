import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { flushSync } from "react-dom";
import { toJpeg } from "html-to-image";
import { GraphProvider } from "../contexts/GraphContext";

export async function captureDataPanel(
    Component,
    step,
    cssText,
    stepIndex,
    graphProps 
) {
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.left = "-9999px";
    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = cssText;
    shadow.appendChild(style);

    const mount = document.createElement("div");
    mount.style.width = "350px";
    mount.style.boxSizing = "border-box";
    shadow.appendChild(mount);

    const root = createRoot(mount);

    flushSync(() => {
        root.render(
            createElement(
                GraphProvider,
                { algorithm: graphProps.algorithm }, 
                createElement(Component, {
                    step,
                    key: stepIndex
                })
            )
        );
    });

    try {
        const img = await toJpeg(mount, {
            backgroundColor: "#ffffff",
            quality: 0.9,
            pixelRatio: 2,
            skipFonts: true,
            cacheBust: false,
            includeQueryParams: false,

            filter: (node) => {
                if (node.tagName === "LINK") return false;

                return true;
            }
        });

        return img;
        
    } finally {
        root.unmount();
        host.remove();
    }
}