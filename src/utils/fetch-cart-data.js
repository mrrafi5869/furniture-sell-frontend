import axios from "axios";
import { getGuestId } from "./get-unique-id";

export const fetchCartData = async ({ setCartData }) => {
  try {
    const guestId = getGuestId(); // Get guestId from utility or state
    const response = await axios.get(`/cart/my-cart?guestId=${guestId}`);
    setCartData(response.data.data); // Set cart data from response
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
};
