/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import ShowCart from "@/components/product-details/ShowCart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getGuestId } from "@/utils/get-unique-id";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { fetchCartData } from "@/utils/fetch-cart-data";

// Sample product data based on schema
const product = {
  name: "Crystal Honey 1kg",
  description: "Premium quality honey. Perfect for your healthy lifestyle.",
  category: "other",
  price: 1000,
  stock: 50,
  dimensions: {
    height: 15,
    width: 10,
    depth: 10,
    unit: "cm",
  },
  material: "Glass",
  color: "Golden",
  images: [
    "https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737192587/ce7c0b5f-8c3f-41aa-ad4b-11d5db75a46f_amlgty.jpg",
    "https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737192532/4e80d9de-5ed3-4ee7-8d66-5903f4dc7466_dt9zlu.jpg",
    "https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737188594/4f38da4a-ba67-43f9-ab04-1aaaf6e5236f_qg8vhj.jpg",
    "https://res.cloudinary.com/dpfjg8tdc/image/upload/v1737192577/ead7dfd9-19ec-46d3-a048-0aa550069d27_p11pxb.jpg",
  ],
  ratings: 4.5,
  status: "available",
  reviews: [
    {
      user: "user1",
      userName: "John Doe",
      comment: "Great product!",
      createdAt: new Date(),
    },
  ],
};

export default function ProductDetail() {
  const { id } = useParams(); // Extract the product ID from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [cartData, setCartData] = useState(null); // State to store cart data
  const [api, setApi] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });

    api.on("settle", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    // Fetch product details from the API
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        setProduct(response?.data?.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast({
          description: "Unable to fetch product details.",
          status: "error",
        });
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  const guestId = getGuestId();

  const handleAddToCart = async () => {
    try {
      await axios.post("/cart/add", {
        guestId,
        productId: product._id,
        quantity,
      });
      fetchCartData({ setCartData });
      setIsInCart(true);
      setIsSheetOpen(true);
      toast({
        description: "Product added to cart successfully!",
        status: "success",
      });
    } catch (error) {
      toast({
        description: "Unable to add product to cart.",
        status: "error",
      });
    }
  };
  console.log(product)
  return (
    <div>
      <Navbar
        fetchCartData={fetchCartData}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        cartData={cartData}
        setCartData={setCartData}
        product={product}
      />
      <div className="container py-8 px-5">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-4">
              <Carousel className="w-full aspect-square" setApi={setApi}>
                <CarouselContent>
                  {product?.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative h-full">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} view ${index + 1}`}
                          className="rounded-lg object-cover w-full h-full"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`flex-shrink-0 ${
                      currentSlide === index
                        ? "border-2 border-teal-500 rounded-md"
                        : "border-2 rounded-md"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.ratings)
                          ? "fill-teal-500 text-teal-500"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews.length} reviews)
                </span>
              </div>
            </div>

            <p className="text-2xl font-bold text-teal-700">
              Tk {product.price}
            </p>

            <div className="space-y-4">
              <h3 className="font-semibold">Details</h3>

              <p className="text-gray-600">{product.description}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Dimensions</h3>
                  <p className="text-gray-600">
                    {product.dimensions.height}x{product.dimensions.width}x
                    {product.dimensions.depth} {product.dimensions.unit}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Material</h3>
                  <p className="text-gray-600">{product.material}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Color</h3>
                  <p className="text-gray-600">{product.color}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <Badge
                    variant={
                      product.status === "available" ? "default" : "destructive"
                    }
                    className="text-white pb-1"
                  >
                    {product.status}
                  </Badge>
                </div>
              </div>
            </div>

            <button
              className={`w-full py-3 text-white rounded-lg ${
                isInCart
                  ? "bg-teal-500 hover:bg-teal-600"
                  : "bg-teal-700 hover:bg-teal-800"
              }`}
              onClick={isInCart ? () => setIsSheetOpen(true) : handleAddToCart}
            >
              {product?.userAddedToCart?.includes(guestId) ? "View Cart" : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* Cart Sheet */}
        {/* <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <div className="flex items-center space-x-4">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-gray-600">Tk {product.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="border rounded-lg p-2"
                    onClick={() => handleQuantityChange("decrease")}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <button
                    className="border rounded-lg p-2"
                    onClick={() => handleQuantityChange("increase")}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                <button
                  className="text-red-500 hover:underline"
                  onClick={handleRemoveFromCart}
                >
                  Remove
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>Tk {product.price * quantity}</span>
                </div>
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button className="w-full py-3 text-white bg-teal-500 hover:bg-teal-600 rounded-lg">
                      Place Order with Cash on Delivery
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogDescription>
                        <ShowCart />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </SheetContent>
        </Sheet> */}
      </div>
    </div>
  );
}
