// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents: true, // Mantén tus otras configuraciones si las tenías
  images: {
    remotePatterns: [
      {
        protocol: "https", // Cambiado a https por seguridad
        hostname: "secure-desk-ba9bf7e12c.strapiapp.com", // Tu nuevo dominio de Strapi
        pathname: "/uploads/**", // Mantiene la misma ruta para las imágenes
      },
    ],
    // En producción ya puedes evaluar quitar 'unoptimized: true' si quieres que
    // Next.js optimice el peso de tus imágenes automáticamente.
    unoptimized: true,
  },
};

export default nextConfig;
