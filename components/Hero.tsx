import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroProps {
  data: {
    heading: string;
    subHeading: string;
    image: {
      url: string;
      alternativeText: string | null;
    };
    link: {
      href: string;
      label: string;
      isExternal: boolean | null;
    };
  };
}

export function Hero({ data }: HeroProps) {
  const { heading, subHeading, image, link } = data;
  const imageUrl = `${image.url}`;

  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={image.alternativeText || "Fondo"}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/50 bg-linear-to-b from-black/20 to-black/60 z-10" />
      </div>

      <div className="container relative z-20 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-white text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              {heading}
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl md:text-2xl max-w-175 mx-auto font-light">
              {subHeading}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="px-10 py-7 text-lg rounded-full bg-white text-black hover:bg-gray-200 transition-all shadow-xl hover:scale-105 hover:text-white active:scale-95"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
