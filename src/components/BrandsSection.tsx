export default function BrandsSection() {
  const brands = [
    { href: "https://ibb.co/vxRgyCD6", img: "https://i.ibb.co/VW5rn03c/image-removebg-preview-7.png", alt: "VR Luxuries logo" },
    { href: "https://imgbb.com/", img: "https://i.ibb.co/6RXjvt8W/ls2-Photoroom-png-Photoroom-Copy-1-Copy.png", alt: "Layerstop logo" },
    { href: "https://ibb.co/LdtM7NR1", img: "https://i.ibb.co/HTz08h4q/p-Vi6ac-UPBQY7-Itjptopv-Y2y-Wp4-Ltw-Bxxk-Em-XYHP7.png", alt: "Velva Aura logo" },
    { href: "https://imgbb.com/", img: "https://i.ibb.co/whHBfp7z/devsphere-Logo.png", alt: "Devspear logo" },
  ];

  return (
    <section className="brands-section">
      <div className="brands-title">Trusted by innovative brands</div>
      <div className="brands-grid">
        {brands.map((b, i) => (
          <div className="brand-item" key={i}>
            <a href={b.href} target="_blank" rel="noopener noreferrer">
              <img className="brand-logo" src={b.img} alt={b.alt} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
