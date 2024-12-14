'use client'

import * as React from "react"
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

const images = [
  ''
  // 'https://media.istockphoto.com/id/1413873774/photo/business-team-portrait.jpg?s=2048x2048&w=is&k=20&c=kVL_PdymCjT1F1ar0TZyie40CjV60CezUkRj5gTcqhM=',
  // 'https://media.istockphoto.com/id/1413873774/photo/business-team-portrait.jpg?s=2048x2048&w=is&k=20&c=kVL_PdymCjT1F1ar0TZyie40CjV60CezUkRj5gTcqhM=',
  // 'https://media.istockphoto.com/id/1413873774/photo/business-team-portrait.jpg?s=2048x2048&w=is&k=20&c=kVL_PdymCjT1F1ar0TZyie40CjV60CezUkRj5gTcqhM=',
]

export function CarouselDemo() {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  return (
    <Carousel className="w-full max-w-xl relative"
      // onSelect={(e) => setCurrentSlide(e)}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-[4/3] items-center justify-center p-0">
                  <Image
                    src={src}
                    alt={`App preview ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </Carousel>
  )
}
