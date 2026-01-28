import React, { useState, useEffect } from 'react';
import { authAPI, itemsAPI } from '../services/api';
import { Edit2, Save, Camera, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [items, setItems] = useState({ lostItems: [], foundItems: [] });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await authAPI.getProfile(token);
      setUser(res.user);
      setStats(res.stats);
      setItems(res.items);
      setFormData(res.user);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('phone', formData.phone);
      data.append('address', formData.address);
      data.append('city', formData.city);
      data.append('bio', formData.bio);
      if (profileImage) {
        data.append('profileImage', profileImage);
      }

      const res = await authAPI.updateProfile(token, data);
      setUser(res.user);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile');
    }
  };

  const handleDeleteItem = async (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        if (type === 'lost') {
          await itemsAPI.deleteLostItem(token, id);
          setItems({
            ...items,
            lostItems: items.lostItems.filter(i => i._id !== id)
          });
        } else {
          await itemsAPI.deleteFoundItem(token, id);
          setItems({
            ...items,
            foundItems: items.foundItems.filter(i => i._id !== id)
          });
        }
        alert('Item deleted successfully!');
      } catch (err) {
        console.error('Error deleting item:', err);
        alert('Failed to delete item');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const ItemCard = ({ item, type }) => (
    <div className="bg-white rounded-lg shadow p-4">
      {item.image && (
        <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded mb-3" />
      )}
      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
      <p className="text-sm text-gray-600 mb-3">{item.location}</p>
      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/edit/${type}/${item._id}`)}
          className="flex-1 bg-blue-500 text-white py-1 rounded text-sm hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteItem(type, item._id)}
          className="flex-1 bg-red-500 text-white py-1 rounded text-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg transition w-full md:w-auto justify-center md:justify-start"
          >
            {editing ? <Save size={20} /> : <Edit2 size={20} />}
            {editing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 flex items-center justify-center overflow-hidden">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="text-4xl font-bold text-gray-400">{user?.name?.charAt(0)}</div>
              )}
            </div>
            {editing && (
              <label className="cursor-pointer flex items-center gap-2 text-primary hover:text-secondary transition text-sm md:text-base">
                <Camera size={20} />
                <span>Change Photo</span>
                <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
              </label>
            )}
          </div>

          {/* Profile Info */}
          <div className="md:col-span-2 space-y-4">
            {editing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:shadow-lg transition text-sm md:text-base"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Name</p>
                  <p className="text-lg md:text-xl font-semibold text-gray-900">{user?.name}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Phone</p>
                    <p className="text-base md:text-lg font-semibold text-gray-900">{user?.phone || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">City</p>
                    <p className="text-base md:text-lg font-semibold text-gray-900">{user?.city || 'Not set'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Email</p>
                  <p className="text-base md:text-lg font-semibold text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Bio</p>
                  <p className="text-sm md:text-base text-gray-900">{user?.bio || 'No bio added yet'}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-gray-600 text-xs md:text-sm">Total Items Posted</p>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">{stats?.totalItemsPosted}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <p className="text-gray-600 text-xs md:text-sm">Lost Items</p>
          <p className="text-2xl md:text-3xl font-bold text-red-600">{stats?.lostItems}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-gray-600 text-xs md:text-sm">Found Items</p>
          <p className="text-2xl md:text-3xl font-bold text-green-600">{stats?.foundItems}</p>
        </div>
      </div>

      {/* My Items */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">My Items</h2>

        <div className="mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Lost Items ({items.lostItems.length})</h3>
          {items.lostItems.length === 0 ? (
            <p className="text-gray-500 text-sm md:text-base">No lost items posted</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {items.lostItems.map(item => (
                <ItemCard key={item._id} item={item} type="lost" />
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Found Items ({items.foundItems.length})</h3>
          {items.foundItems.length === 0 ? (
            <p className="text-gray-500 text-sm md:text-base">No found items posted</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {items.foundItems.map(item => (
                <ItemCard key={item._id} item={item} type="found" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
