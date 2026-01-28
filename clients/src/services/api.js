const API_URL = "http://localhost:5000/api";

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
