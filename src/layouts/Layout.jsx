import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div className="bg-[#F6F5F1] min-h-screen text-black">
      <Outlet />
      <Footer />
    </div>
  );
}
