import type { Metadata } from "next";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

export const metadata: Metadata = {
  title: "Sahil Chavan | Creative Developer Portfolio",
  description: "A highly interactive, modern portfolio showcasing a multi-disciplinary approach to digital creation, blending coding, video editing, UI/UX design, and 3D animation.",
  openGraph: {
    title: "Sahil Chavan | Creative Developer Portfolio",
    description: "A highly interactive, modern portfolio showcasing a multi-disciplinary approach to digital creation, blending coding, video editing, UI/UX design, and 3D animation.",
    images: ["/og-image.png"],
    url: "https://sahilchavan-portfolio-20.vercel.app/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Chavan | Creative Developer Portfolio",
    description: "A highly interactive, modern portfolio showcasing a multi-disciplinary approach to digital creation, blending coding, video editing, UI/UX design, and 3D animation.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}

