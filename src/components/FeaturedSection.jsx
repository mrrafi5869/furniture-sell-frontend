import React from 'react';

export function FeaturedSections() {
  // Dynamic data for the component
  const categories = [
    { title: 'Living Room', image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737186872/pexels-fotoaibe-1743227_hxuu6n.jpg' },
    { title: 'Bedroom', image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737187316/pexels-marywhitneyph-90317_z81ife.jpg' },
    { title: 'Office', image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737186872/pexels-atbo-66986-245208_cxxqwz.jpg' },
  ];

  const specialOffers = {
    title: 'Special Offers',
    description:
      'Get up to 40% off on selected items this season. Don\'t miss out on our exclusive deals on premium furniture pieces.',
    image: 'https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737187843/Dark_Blue_and_Gray_Modern_Minimalist_Furnitures_Imstagram_Post_exfizo.png',
  };

  return (
    <div className="pt-16 bg-beige-50">
      {/* Featured Categories */}
      <section id='categories'>
        <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.title}
              className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg"
            >
              <div className="relative h-64">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <button className="w-full px-4 py-2 border rounded-lg text-teal-700 border-teal-700 hover:bg-teal-700 hover:text-white transition">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      {/* <section className="container mb-16 bg-teal-700 text-white rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{specialOffers.title}</h2>
            <p className="text-lg">{specialOffers.description}</p>
            <button className="px-6 py-3 bg-white text-teal-700 rounded-lg hover:bg-gray-200 transition">
              View Offers
            </button>
          </div>
          <div className="relative h-64 md:h-52 w-full">
            <img
              src={specialOffers.image}
              alt="Special Offers"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default FeaturedSections;
