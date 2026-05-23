import { getHomePageData } from "@/lib/strapi";
import { Hero } from "@/components/Hero";
import { Suspense } from "react";

export async function generateMetadata() {
  const strapiData = await getHomePageData();

  return {
    title: strapiData?.metaTitle || "Página de Inicio",
    description:
      strapiData?.metaDescription || "Bienvenido a nuestra página de inicio",
  };
}

// 1. Creamos un componente que solo se encarga de los datos
async function HomeContent() {
  const strapiData = await getHomePageData();
  if (!strapiData) return null;

  const heroData = strapiData.sections.find(
    (section: any) => section.__component === "layout.hero-section",
  );

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">{heroData && <Hero data={heroData} />}</div>
      <div className="w-full max-w-360 px-6 mx-auto py-10">
        <h2 className="text-3xl font-bold">{strapiData.title}</h2>
      </div>
    </main>
  );
}

// 2. La página principal ahora es "instantánea" porque delega la carga
export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Cargando...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
