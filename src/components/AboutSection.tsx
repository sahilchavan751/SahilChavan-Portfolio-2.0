import RevealOnScroll from "./RevealOnScroll";

export default function AboutSection() {
  return (
    <RevealOnScroll className="about-section">
      <div className="about-grid">
        <div className="about-left">
          <p className="section-label"></p>
          <h2 className="about-title">
            <span className="initial-part">Core</span>{" "}
            <span className="portfolio-part">Expertise</span>
          </h2>
        </div>
        <div className="about-divider" />
        <div className="about-right">
          <p className="about-description">
            <b></b>
            A multidisciplinary approach blending coding, video editing, UI/UX design, and 3D animation. 
            I focus on bridging the gap between technical execution and compelling visual storytelling to build engaging, modern digital experiences.
          </p>
        </div>
      </div>
    </RevealOnScroll>
  );
}
