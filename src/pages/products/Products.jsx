import { useState, useEffect } from "react";
import axios from "axios"; // Importing Axios
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]); // State for storing products
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for any error

  const categories = ["all", "living_room", "bedroom", "dining_room", "office"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/product/get-all-products"); // Fetch data from the API
        console.log(response.data)
        setProducts(response.data?.data); // Set the fetched products to state
        setLoading(false); // Set loading to false once the data is fetched
      } catch (err) {
        setError("Failed to fetch products."); // Handle errors
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means it runs once on mount

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);
      console.log(filteredProducts)

  if (loading) {
    return <div>Loading...</div>; // Show loading message if data is still fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any error occurred
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Our Collection
        </h1>
        <div className="w-full overflow-x-auto pb-4 mb-8">
          <Tabs
            defaultValue="all"
            className="w-max mx-auto lg:mb-12 overflow-x-auto"
            onValueChange={setActiveCategory}
          >
            <TabsList className="inline-flex w-auto min-w-full justify-start sm:justify-center bg-white p-1 rounded-full">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-6 py-2 rounded-full capitalize text-sm font-medium transition-all duration-200 hover:bg-gray-100"
                >
                  {category.replace("_", " ")}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative overflow-hidden group w-full">
                <div className="relative h-[300px]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="transition-transform duration-300 group-hover:scale-105 object-cover w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    to={`/product-details/${product._id}`}
                    className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-teal-600 mb-4">
                  ${product.price}
                </p>
                <Button className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full py-2 transition-colors duration-200">
                  <ShoppingCart size={20} />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
