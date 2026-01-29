// Use localhost on desktop, detect IP on mobile
const getAPIURL = () => {
  const hostname = window.location.hostname;
  // If accessing from localhost, use localhost:5000
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  // If accessing from an IP address (mobile), use the same IP with port 5000
  return `http://${hostname}:5000/api`;
};

const API_URL = getAPIURL();

// Auth API calls
export const authAPI = {
  register: async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  getProfile: async (token) => {
    const res = await fetch(`${API_URL}/auth/profile`, {
      headers: { "Authorization": token }
    });
    return res.json();
  },

  updateProfile: async (token, formData) => {
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: "PUT",
      headers: { "Authorization": token },
      body: formData
    });
    return res.json();
  },

  verifyEmail: async (token) => {
    const res = await fetch(`${API_URL}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    return res.json();
  },

  forgotPassword: async (email) => {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    return res.json();
  },

  resetPassword: async (token, newPassword) => {
    const res = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword })
    });
    return res.json();
  }
};

// Items API calls
export const itemsAPI = {
  createLostItem: async (token, formData) => {
    const res = await fetch(`${API_URL}/items/lost`, {
      method: "POST",
      headers: { "Authorization": token },
      body: formData
    });
    return res.json();
  },

  createFoundItem: async (token, formData) => {
    const res = await fetch(`${API_URL}/items/found`, {
      method: "POST",
      headers: { "Authorization": token },
      body: formData
    });
    return res.json();
  },

  getLostItems: async () => {
    const res = await fetch(`${API_URL}/items/lost`);
    return res.json();
  },

  getFoundItems: async () => {
    const res = await fetch(`${API_URL}/items/found`);
    return res.json();
  },

  getLostItemDetail: async (id) => {
    const res = await fetch(`${API_URL}/items/lost/${id}`);
    return res.json();
  },

  getFoundItemDetail: async (id) => {
    const res = await fetch(`${API_URL}/items/found/${id}`);
    return res.json();
  },

  updateLostItem: async (token, id, formData) => {
    const res = await fetch(`${API_URL}/items/lost/${id}`, {
      method: "PUT",
      headers: { "Authorization": token },
      body: formData
    });
    return res.json();
  },

  updateFoundItem: async (token, id, formData) => {
    const res = await fetch(`${API_URL}/items/found/${id}`, {
      method: "PUT",
      headers: { "Authorization": token },
      body: formData
    });
    return res.json();
  },

  deleteLostItem: async (token, id) => {
    const res = await fetch(`${API_URL}/items/lost/${id}`, {
      method: "DELETE",
      headers: { "Authorization": token }
    });
    return res.json();
  },

  deleteFoundItem: async (token, id) => {
    const res = await fetch(`${API_URL}/items/found/${id}`, {
      method: "DELETE",
      headers: { "Authorization": token }
    });
    return res.json();
  },

  getMatches: async () => {
    const res = await fetch(`${API_URL}/items/match`);
    return res.json();
  }
};

// Notifications API calls
export const notificationsAPI = {
  getNotifications: async (token) => {
    const res = await fetch(`${API_URL}/notifications`, {
      headers: { "Authorization": token }
    });
    return res.json();
  },

  markAsRead: async (token, id) => {
    const res = await fetch(`${API_URL}/notifications/${id}/read`, {
      method: "PUT",
      headers: { "Authorization": token }
    });
    return res.json();
  },

  markAllAsRead: async (token) => {
    const res = await fetch(`${API_URL}/notifications/read-all`, {
      method: "PUT",
      headers: { "Authorization": token }
    });
    return res.json();
  },

  deleteNotification: async (token, id) => {
    const res = await fetch(`${API_URL}/notifications/${id}`, {
      method: "DELETE",
      headers: { "Authorization": token }
    });
    return res.json();
  }
};
