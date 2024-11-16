import React from 'react';
import { Ship, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Ship className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SmartLading</span>
            </div>
            <p className="mt-4 text-gray-500">
              Revolutionizing maritime documentation through blockchain technology and AI.
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Features</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Technology</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Security</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">About</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8">
          <p className="text-base text-gray-400 text-center">
            © 2024 SmartLading. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}