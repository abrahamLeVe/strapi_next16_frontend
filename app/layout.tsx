import type { Metadata } from "next";
import { Nunito, Geist_Mono } from "next/font/google"; // Importamos Nunito
import "./globals.css";

// Configuramos Nunito
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Cargamos los pesos necesarios para títulos y párrafos
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mi App con Strapi & Next 16",
  description: "Sistema moderno creado con Next.js y Strapi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" // Cambiado a español ya que tu contenido está en español
      className={`${nunito.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Aplicamos font-sans para que Nunito sea la fuente por defecto en todo el cuerpo */}
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
