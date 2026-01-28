import React, { useState } from 'react';
import { itemsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Upload, AlertCircle } from 'lucide-react';

export default function PostLostItem() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    location: '',
    date: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const categories = [
    'Electronics',
    'Jewelry',
    'Clothing',
    'Documents',
    'Keys',
    'Pets',
    'Vehicles',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('location', formData.location);
      data.append('date', formData.date);
      if (image) {
        data.append('image', image);
      }

      const res = await itemsAPI.createLostItem(token, data);
      if (res._id) {
        alert('Lost item posted successfully!');
        navigate('/dashboard');
      } else {
        setError(res.msg || 'Failed to post item');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Report Lost Item</h1>
      <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Help reunite your lost item with you by posting details</p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
          <p className="text-red-600 text-sm md:text-base">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-4 md:p-8 space-y-4 md:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Item Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
            placeholder="e.g., Red Wallet"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
            placeholder="Describe the item, its condition, distinguishing features..."
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Lost</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
            placeholder="Where was it lost?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
          <label className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 flex flex-col items-center cursor-pointer hover:border-primary transition">
            <Upload size={32} className="text-gray-400 mb-2" />
            <span className="text-gray-600 text-xs md:text-sm text-center px-2">{image ? image.name : 'Click to upload or drag and drop'}</span>
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 text-sm md:text-base"
        >
          {loading ? 'Posting...' : 'Post Lost Item'}
        </button>
      </form>
    </div>
  );
}
