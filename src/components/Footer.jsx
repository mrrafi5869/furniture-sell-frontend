import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-teal-700 text-white px-5" id='contact'>
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-teal-100">
              LuxeFurniture provides premium quality furniture for your home and office.
              We believe in combining comfort with style.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/products" className="text-teal-100 hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="/categories" className="text-teal-100 hover:text-white">
                  Categories
                </a>
              </li>
              <li>
                <a href="/about" className="text-teal-100 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-teal-100 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-teal-100">
              <li>123 Furniture Street</li>
              <li>City, State 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@luxefurniture.com</li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-teal-100 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-teal-100 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-teal-100 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-teal-600 mt-8 pt-8 text-center text-teal-100">
          <p>&copy; 2024 LuxeFurniture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
