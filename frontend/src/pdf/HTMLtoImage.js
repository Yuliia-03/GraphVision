import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { flushSync } from "react-dom";
import { toJpeg } from "html-to-image";

export async function captureDataPanel(Component, step, cssText, stepIndex) {
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
            createElement(Component, {
                step,
                key: stepIndex
            })
        );
    });

    const img = await toJpeg(mount, {
        backgroundColor: "#ffffff",
        quality: 0.85,
        pixelRatio: 3,
        skipFonts: true,
        cacheBust: true
    });

    root.unmount();
    host.remove();

    return img;
}
