"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Card, CardContent } from "@mui/material";
import { listProducts } from "./listProducts";
import ProductCar from "@/app/components/products/ProductCart";

  export function CarouselSize() {
    return (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2x1:grid-cols-6 gap-8">
          {listProducts.map((product: any) => {
          return <ProductCar data={product}/>
          })}
        </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  }
