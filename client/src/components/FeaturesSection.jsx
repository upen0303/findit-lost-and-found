import React from 'react';
import { FileText, Zap, CheckCircle, MessageSquare } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      title: 'Report Items',
      description: 'Post your lost or found items.',
      icon: FileText,
      color: 'text-blue-500',
    },
    {
      title: 'Smart Matching',
      description: 'Get matched with similar reports.',
      icon: Zap,
      color: 'text-yellow-500',
    },
    {
      title: 'Admin Verified',
      description: 'Admin reviews for authenticity.',
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      title: 'Messages',
      description: 'Chat directly to resolve claims.',
      icon: MessageSquare,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="ml-64 pr-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>

      {/* First Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className={`mb-4 inline-block p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors`}>
                <Icon size={28} className={feature.color} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Second Row - Duplicate */}
      <div className="grid grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={`dup-${index}`}
              className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className={`mb-4 inline-block p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors`}>
                <Icon size={28} className={feature.color} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
