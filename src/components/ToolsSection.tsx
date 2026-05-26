import RevealOnScroll from "./RevealOnScroll";

export default function ToolsSection() {
  const tools = [
    { src: "/images/tools/photoshop.png", name: "Photoshop" },
    { src: "/images/tools/premiere.png", name: "Premiere Pro" },
    { src: "https://cdn.simpleicons.org/figma", name: "Figma" },
    { src: "https://cdn.simpleicons.org/github", name: "GitHub" },
    { src: "https://cdn.simpleicons.org/behance", name: "Behance" },
    { src: "/images/tools/google_labs.png", name: "Google Labs" },
    { src: "/images/tools/vscode.png", name: "VS Code" },
  ];

  return (
    <RevealOnScroll className="tools-section">
      <div className="tools-container">
        <div className="tools-left">
          <div className="tools-title">My Creative Stack</div>
          <div className="tools-grid">
            {tools.map((tool, i) => (
              <div className="tool-item" key={i}>
                <img src={tool.src} alt={tool.name} className="tool-icon" />
                <span className="tool-name">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="tools-right">
          <p className="tools-description ttcommons">
            I leverage a vast ecosystem of <b>industry standard tools</b> and cutting edge{" "}
            <b>AI integration</b> to transform ambitious ideas into high impact digital experiences.
          </p>
        </div>
      </div>
    </RevealOnScroll>
  );
}
