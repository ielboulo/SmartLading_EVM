import React from 'react';
import { Ship, Clock, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Revolutionizing Maritime</span>
            <span className="block text-blue-600">Documentation with Blockchain</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Transform bill of lading processing from 17 hours to just 14 minutes with our blockchain-powered platform.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                Get Started
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Learn More
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
            <Clock className="h-12 w-12 text-blue-600" />
            <h3 className="mt-4 text-lg font-medium">120x Faster Processing</h3>
            <p className="mt-2 text-gray-500 text-center">Reduce documentation processing time dramatically</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
            <Shield className="h-12 w-12 text-blue-600" />
            <h3 className="mt-4 text-lg font-medium">Enhanced Security</h3>
            <p className="mt-2 text-gray-500 text-center">Blockchain-powered security and transparency</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm">
            <Ship className="h-12 w-12 text-blue-600" />
            <h3 className="mt-4 text-lg font-medium">Global Coverage</h3>
            <p className="mt-2 text-gray-500 text-center">Supporting 90% of global trade volume</p>
          </div>
        </div>
      </div>
    </div>
  );
}