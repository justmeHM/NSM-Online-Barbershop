"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Haircut = {
  name: string;
  price: number;
  imageSrc: string;
};

const haircuts: Haircut[] = [
  { name: "Taper Fade", price: 80, imageSrc: "/images/img1.jpg" },
  { name: "High Fade", price: 50, imageSrc: "/images/img2.jpg" },
  { name: "Taper with Beard", price: 150, imageSrc: "/images/img3.jpg" },
  { name: "Taper", price: 180, imageSrc: "/images/img4.jpg" },
  { name: "Beard Package", price: 200, imageSrc: "/images/img5.jpg" },
];

export function HaircutCarousel() {
  return (
    <section className="w-full px-4 py-12 sm:py-20 bg-black text-yellow-400">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 drop-shadow-md">
        Our Haircuts
      </h2>

      <Carousel className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto">
        <CarouselContent>
          {haircuts.map((cut, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-2">
                <Card className="overflow-hidden border border-yellow-500 bg-zinc-900 rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative w-full h-48 sm:h-56 md:h-60">
                      <Image
                        src={cut.imageSrc}
                        alt={cut.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    </div>

                    {/* Text */}
                    <div className="p-4 text-center">
                      <h3 className="text-base font-semibold text-yellow-300">
                        {cut.name}
                      </h3>
                      <p className="text-sm text-yellow-200">ZMW {cut.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="text-yellow-400 hover:text-yellow-300" />
        <CarouselNext className="text-yellow-400 hover:text-yellow-300" />
      </Carousel>
    </section>
  );
}
