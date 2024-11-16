import React from 'react';
import { FileText, Shield, Brain, Lock, BookOpen, Link } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Digital Transformation",
      description: "Convert traditional maritime documentation into secure digital formats"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Blockchain Security",
      description: "Immutable records with enhanced transparency and traceability"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Operations",
      description: "Intelligent automation for faster document processing and validation"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Zero-Knowledge Privacy",
      description: "Advanced ZK protocols ensuring data privacy while maintaining transparency"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Regulatory Compliance",
      description: "Built-in compliance with maritime industry regulations"
    },
    {
      icon: <Link className="h-6 w-6" />,
      title: "Multi-Chain Support",
      description: "Cross-chain interoperability for maximum efficiency and flexibility"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Powerful Features for Modern Shipping
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Revolutionizing maritime documentation with cutting-edge technology
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="relative p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-500 transition-colors duration-300">
              <div className="absolute top-6 left-6 bg-blue-100 rounded-lg p-3 text-blue-600">
                {feature.icon}
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}