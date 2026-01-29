import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { itemsAPI } from '../services/api';
import { MapPin, Calendar, User, Mail, Phone, ArrowLeft, Edit2, Trash2 } from 'lucide-react';

export default function ItemDetail() {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchItem();
  }, [id, type]);

  const fetchItem = async () => {
    try {
      const res = type === 'lost' 
        ? await itemsAPI.getLostItemDetail(id)
        : await itemsAPI.getFoundItemDetail(id);
      setItem(res);
    } catch (err) {
      console.error('Error fetching item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        if (type === 'lost') {
          await itemsAPI.deleteLostItem(token, id);
        } else {
          await itemsAPI.deleteFoundItem(token, id);
        }
        alert('Item deleted successfully!');
        navigate('/dashboard');
      } catch (err) {
        alert('Failed to delete item');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Item not found</p>
      </div>
    );
  }

  const isOwner = currentUser?.id === item.user?._id;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-primary hover:text-secondary mb-4 md:mb-6 transition text-sm md:text-base"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Image */}
        <div className="bg-gray-200 rounded-xl overflow-hidden h-64 md:h-96">
          {item.image ? (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-4 md:space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{item.title}</h1>
              <span className={`text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap ${
                item.status === 'Lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {item.status}
              </span>
            </div>
            <p className="text-sm md:text-base text-gray-600">{item.category}</p>
          </div>

          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-3 text-gray-700 text-sm md:text-base">
              <MapPin size={20} className="text-primary flex-shrink-0" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 text-sm md:text-base">
              <Calendar size={20} className="text-primary flex-shrink-0" />
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Description</h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">{item.description}</p>
          </div>

          {/* Owner Info */}
          {item.user && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-gray-600">Name</p>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">{item.user.name}</p>
                  </div>
                </div>
                {item.user.email && (
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <a href={`mailto:${item.user.email}`} className="text-blue-600 hover:underline break-all text-sm md:text-base">
                      {item.user.email}
                    </a>
                  </div>
                )}
                {item.user.phone && (
                  <div className="flex items-start gap-3">
                    <Phone size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <a href={`tel:${item.user.phone}`} className="text-blue-600 hover:underline text-sm md:text-base">
                      {item.user.phone}
                    </a>
                  </div>
                )}
                {item.user.address && (
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Address</p>
                    <p className="text-gray-900 text-sm md:text-base">{item.user.address} {item.user.city && `, ${item.user.city}`}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Owner Actions */}
          {isOwner && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => navigate(`/edit/${type}/${id}`)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 md:py-3 rounded-lg hover:bg-blue-600 transition font-semibold text-sm md:text-base"
              >
                <Edit2 size={20} />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 md:py-3 rounded-lg hover:bg-red-600 transition font-semibold text-sm md:text-base"
              >
                <Trash2 size={20} />
                Delete
              </button>
            </div>
          )}

          {!isOwner && (
            <button
              onClick={() => navigate('/messages', { state: { userId: item.user._id, userName: item.user.name, relatedItem: id, itemType: type } })}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition text-sm md:text-base"
            >
              Contact about this item
            </button>
          )}
        </div>
      </div>

      {/* Posted Info */}
      <div className="mt-8 md:mt-12 text-center text-gray-600 text-xs md:text-sm">
        <p>Posted on {new Date(item.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
