import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const products = [
  {
    id: 1,
    name: 'Modern Lounge Chair',
    price: 599,
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737192587/ce7c0b5f-8c3f-41aa-ad4b-11d5db75a46f_amlgty.jpg',
  },
  {
    id: 2,
    name: 'Ergonomic Office Chair',
    price: 299,
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737192528/grey-comfortable-armchair-isolated-white-background_jcdewv.jpg',
  },
  {
    id: 3,
    name: 'Wooden Coffee Table',
    price: 399,
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737192532/4e80d9de-5ed3-4ee7-8d66-5903f4dc7466_dt9zlu.jpg',
  },
  {
    id: 4,
    name: 'Designer Sofa',
    price: 1299,
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737188594/4f38da4a-ba67-43f9-ab04-1aaaf6e5236f_qg8vhj.jpg',
  },
  {
    id: 5,
    name: 'Dining Table Set',
    price: 899,
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737192577/ead7dfd9-19ec-46d3-a048-0aa550069d27_p11pxb.jpg',
  },
  {
    id: 11,
    name: 'Modern Lounge Chair',
    price: 599,
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737192587/ce7c0b5f-8c3f-41aa-ad4b-11d5db75a46f_amlgty.jpg',
  },
  {
    id: 21,
    name: 'Ergonomic Office Chair',
    price: 299,
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737192528/grey-comfortable-armchair-isolated-white-background_jcdewv.jpg',
  },
  {
    id: 31,
    name: 'Wooden Coffee Table',
    price: 399,
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737192532/4e80d9de-5ed3-4ee7-8d66-5903f4dc7466_dt9zlu.jpg',
  },
  {
    id: 41,
    name: 'Designer Sofa',
    price: 1299,
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737188594/4f38da4a-ba67-43f9-ab04-1aaaf6e5236f_qg8vhj.jpg',
  },
  {
    id: 51,
    name: 'Dining Table Set',
    price: 899,
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737192577/ead7dfd9-19ec-46d3-a048-0aa550069d27_p11pxb.jpg',
  },
];

export function ProductSlider() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">New Arrivals</h2>
        <div className="flex gap-4">
          <button
            onClick={() => scroll('left')}
            className="p-2 border rounded-full border-gray-300 hover:bg-gray-100 transition"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 border rounded-full border-gray-300 hover:bg-gray-100 transition"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[300px] bg-white shadow-md rounded-lg overflow-hidden snap-start"
          >
            <div className="relative h-[300px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col items-start gap-2">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-xl font-bold text-teal-700">${product.price}</p>
              <Link
                to={`/product-details/${product.id}`}
                className='border border-gray-300 text-center rounded-md w-full px-4 py-2 hover:bg-teal-600 hover:text-white transition-all duration-300'
              >
                View Details
              </Link>
              <Button className="w-full text-center px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800  transition-all duration-300">
                Add To Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductSlider;
