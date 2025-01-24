import { v4 as uuidv4 } from "uuid";

function setCookie(name, value, days) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export function getGuestId() {
  let guestId = getCookie("guestId");
  if (!guestId) {
    guestId = uuidv4(); // Generate a new UUID
    setCookie("guestId", guestId, 30); // Set for 30 days
  }
  return guestId;
}
