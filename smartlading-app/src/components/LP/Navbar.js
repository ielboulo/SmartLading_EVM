import React from 'react';
import { Ship, Shield, Boxes, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/app/dashboard');
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Ship className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">SmartLading</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#technology" className="text-gray-600 hover:text-blue-600">Technology</a>
            <a href="#benefits" className="text-gray-600 hover:text-blue-600">Benefits</a>
            <button
            onClick={handleGetStarted}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <a href="#features" className="block px-3 py-2 text-gray-600">Features</a>
            <a href="#technology" className="block px-3 py-2 text-gray-600">Technology</a>
            <a href="#benefits" className="block px-3 py-2 text-gray-600">Benefits</a>

            <button
            onClick={handleGetStarted}
            className="w-full text-left px-3 py-2 bg-blue-600 text-white rounded-lg">
            Get Started 2
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}