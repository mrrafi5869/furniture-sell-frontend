import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export default function ShowCart() {
  const [cartItems] = useState([
    {
      id: 1,
      name: "Special Chicken Pizza",
      price: 120.0,
      quantity: 1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2-nZJWpYqeKrxH6VSkic0qhryz7NYRIm.png",
    },
    {
      id: 2,
      name: "Big Meat Special Pizza",
      price: 150.0,
      quantity: 2,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2-nZJWpYqeKrxH6VSkic0qhryz7NYRIm.png",
    },
  ]);

  const [deliveryLocation, setDeliveryLocation] = useState("inside");
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const deliveryFee = deliveryLocation === "inside" ? 70.0 : 150.0;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = async () => {
    // Validation
    if (!userInfo.name || !userInfo.phone || !userInfo.address) {
      return toast({
        description:
          "Please fill in all the fields before confirming your order.",
        status: "error",
      });
    }

    try {
      // Create order and initialize payment
      const orderData = {
        shippingAddress: userInfo, // Update key name
        cartItems,
        subtotal,
        deliveryFee,
        total,
        deliveryLocation,
      };

      const { data } = await axios.post("/purchase/purchase-product", orderData);
      if (data?.url) {
        window.location.href = data.url; // Redirect to SSLCommerz payment page
      } else {
        toast({
          description: "Failed to initiate payment. Try again.",
          status: "error",
        });
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      toast({
        description: "Something went wrong. Try again later.",
        status: "error",
      });
    }
  };

  return (
    <div>
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Delivery Address */}
        <div className="space-y-4">
          <Input
            placeholder="Your Name"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Phone Number"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Address"
            name="address"
            value={userInfo.address}
            onChange={handleInputChange}
          />

          {/* Radio Group for Delivery Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Delivery Location</label>
            <RadioGroup
              value={deliveryLocation}
              onValueChange={(value) => setDeliveryLocation(value)}
            >
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <RadioGroupItem value="inside" id="inside" />
                  <span>Inside Dhaka</span>
                </label>
                <label className="flex items-center gap-2">
                  <RadioGroupItem value="outside" id="outside" />
                  <span>Outside Dhaka</span>
                </label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          <h3 className="font-semibold">Billing Information:</h3>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 border rounded-lg p-2"
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  ৳{item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
              <p className="font-medium">
                ৳{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>৳{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span>৳{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t">
            <span>Total</span>
            <span>৳{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Order Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Order Notes</label>
          <Textarea placeholder="Write your order notes..." className="h-24" />
        </div>

        <div className="text-sm text-muted-foreground text-center">
          <p>
            Please fill out all the information above accurately and confirm
            your order.
          </p>
          <p>Your order will be delivered shortly.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t mt-auto">
        <Button
          className="w-full bg-teal-800 hover:bg-teal-700 text-white"
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </Button>
      </div>
    </div>
  );
}
