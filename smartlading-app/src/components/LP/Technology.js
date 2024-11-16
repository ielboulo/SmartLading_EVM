import React from 'react';
import { Shield, Workflow, Layers } from 'lucide-react';

export default function Technology() {
  return (
    <section id="technology" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Advanced Technology Stack
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Leveraging cutting-edge blockchain and AI technologies for secure, efficient maritime documentation.
          </p>
        </div>

        <div className="mt-20">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                  <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Zero-Knowledge Proofs
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-blue-600">
                      <Shield className="mx-auto h-12 w-12" />
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Account Abstraction
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-blue-600">
                      <Workflow className="mx-auto h-12 w-12" />
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Multi-Chain Support
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-blue-600">
                      <Layers className="mx-auto h-12 w-12" />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}