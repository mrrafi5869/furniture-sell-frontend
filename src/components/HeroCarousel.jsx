import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737186864/pexels-fotoaibe-1571463_kov2wl.jpg',
    title: 'Modern Living Room Collection',
    description: 'Transform your space with our latest designer furniture',
  },
  {
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737186863/pexels-pixabay-279746_a04mrk.jpg',
    title: 'Luxury Bedroom Sets',
    description: 'Create your perfect sanctuary with premium comfort',
  },
  {
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737186862/pexels-monoar-rahman-22660-115747_osknsh.jpg',
    title: 'Office Essentials',
    description: 'Elevate your workspace with ergonomic solutions',
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === current ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <img
            src={slide.image || '/placeholder.svg'}
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="mb-8 text-lg sm:text-xl">{slide.description}</p>
              <button className="px-6 py-3 text-lg font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white rounded-full p-2 hover:bg-white/40"
        onClick={() =>
          setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1))
        }
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white rounded-full p-2 hover:bg-white/40"
        onClick={() =>
          setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1))
        }
      >
        <ChevronRight className="h-8 w-8" />
      </button>
    </div>
  );
}

export default HeroCarousel;
