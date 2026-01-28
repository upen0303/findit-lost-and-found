import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Zap, Users, Shield, MapPin, Bell, ArrowRight, Star } from 'lucide-react';

export default function PublicLanding() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: 'Easy Reporting',
      description: 'Post lost or found items in seconds with detailed information and photos'
    },
    {
      icon: Zap,
      title: 'Smart Matching',
      description: 'Our AI matches lost and found items by category and location automatically'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with thousands of people helping reunite lost belongings'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your data is protected with enterprise-grade security and encryption'
    },
    {
      icon: MapPin,
      title: 'Location Based',
      description: 'Find items near you with location-based filtering and search'
    },
    {
      icon: Bell,
      title: 'Real-time Alerts',
      description: 'Get instant notifications when items match your lost items'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Items Recovered' },
    { number: '50K+', label: 'Happy Users' },
    { number: '100+', label: 'Cities Covered' },
    { number: '95%', label: 'Match Rate' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Found her AirPods',
      text: 'Found my lost AirPods within 24 hours thanks to FindIt. The community is amazing!',
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Chen',
      role: 'Recovered Important Documents',
      text: 'Someone posted my lost passport. FindIt reunited us in no time. Highly recommended!',
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Davis',
      role: 'Found Pet',
      text: 'Lost my cat for 3 days. Posted on FindIt and got notifications immediately. My cat is home!',
      avatar: '👩‍🎓'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">FindIt</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-gray-600 font-semibold hover:text-gray-900 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Reunite Lost Items with Their Owners
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            FindIt is a community-driven platform that helps you find lost items and return found belongings. 
            Together, we reunite people with what matters most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              Start Finding <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition"
            >
              Sign In
            </button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl h-96 flex items-center justify-center border border-gray-200">
            <div className="text-center">
              <Search size={64} className="text-primary mx-auto mb-4" />
              <p className="text-gray-600">Find What You Lost</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FindIt?</h2>
            <p className="text-xl text-gray-600">Powerful features designed to help you recover lost items</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Success stories from our community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Lost Item?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of people who've successfully recovered their lost belongings
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:shadow-lg transition"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="font-bold">F</span>
                </div>
                <h3 className="text-xl font-bold">FindIt</h3>
              </div>
              <p className="text-gray-400">Reuniting people with lost belongings</p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">
              © 2026 FindIt. All rights reserved. | Built with ❤️ for community reunification
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
