/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart, Search, Menu, MinusIcon, PlusIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { getGuestId } from "@/utils/get-unique-id";
import { useState } from "react";
import { fetchCartData } from "@/utils/fetch-cart-data";

function Navbar({
  cartData,
  setCartData,
  isSheetOpen,
  setIsSheetOpen,
  product,
}) {
  const [quantity, setQuantity] = useState(1);

  const location = useLocation(); // Get the current location
  const guestId = getGuestId();

  const handleCartClick = () => {
    setIsSheetOpen(true);
    fetchCartData({ setCartData });
  };

  const handleQuantityChange = async (action) => {
    let newQuantity = quantity;
    if (action === "increase") {
      newQuantity += 1;
    } else if (action === "decrease" && quantity > 1) {
      newQuantity -= 1;
    } else {
      return;
    }

    try {
      await axios.put("cart/update", {
        guestId,
        productId: product._id,
        quantity: newQuantity,
      });
      fetchCartData({ setCartData });
      setQuantity(newQuantity);
    } catch (error) {
      toast({
        description: "Unable to update cart quantity.",
        status: "error",
      });
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await axios.delete("cart/remove", {
        data: {
          guestId,
          productId: product._id,
        },
      });

      setIsSheetOpen(false);
      toast({
        description: "Product removed from cart!",
        status: "success",
      });
    } catch (error) {
      toast({
        description: "Unable to remove product from cart.",
        status: "error",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-5">
      <div className="flex h-16 items-center justify-between">
        {/* Mobile Menu Toggle */}
        <Sheet>
          <SheetTrigger className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription className="text-black text-left flex flex-col gap-6">
                <Link to="/" className="mr-6 space-x-2">
                  <span className="text-2xl font-bold text-teal-700">
                    LuxeFurniture
                  </span>
                </Link>
                <Link to="/products" className="text-sm font-semibold">
                  Products
                </Link>
                <a href="#categories" className="text-sm font-semibold">
                  Categories
                </a>
                <a href="#contact" className="text-sm font-semibold">
                  Contact
                </a>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {/* Brand Logo */}
        <Link to="/" className="mr-6 hidden md:flex items-center space-x-2">
          <span className="text-2xl font-bold text-teal-700">
            LuxeFurniture
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-center w-full lg:gap-x-12">
          <Link to="/products" className="text-sm font-semibold">
            Products
          </Link>
          <a href="#categories" className="text-sm font-semibold">
            Categories
          </a>
          <a href="#contact" className="text-sm font-semibold">
            Contact
          </a>
        </div>

        {/* Search and Cart */}
        <div className="flex items-center justify-end space-x-4 w-full max-w-xs">
          {location.pathname === "/products" && (
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8 border rounded-lg py-2"
              />
            </div>
          )}
          <button className="relative" onClick={handleCartClick}>
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-teal-600 text-xs text-white flex items-center justify-center">
              {cartData ? cartData.totalItems : 0}
            </span>
          </button>
          {/* Cart Sheet */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                {cartData ? (
                  cartData.items.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex items-center space-x-4"
                    >
                      <img
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-600">Tk {item.product.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="border rounded-lg p-2"
                          onClick={() => handleQuantityChange("decrease")}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="text-xl font-semibold">
                          {item?.quantity}
                        </span>
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
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Subtotal</span>
                    <span>Tk {cartData ? cartData.totalPrice : 0}</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
