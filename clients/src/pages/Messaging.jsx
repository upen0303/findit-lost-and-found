import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Send, Search } from "lucide-react";
import { messagesAPI } from "../services/api";

export default function Messaging() {
  const navigate = useNavigate();
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadTotal, setUnreadTotal] = useState(0);

  const token = localStorage.getItem("token");

  const getCurrentUserId = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user)._id : null;
  };

  // Auto-select user if navigated from ItemDetail (state.userId)
  useEffect(() => {
    if (location?.state?.userId) {
      setSelectedUser({ _id: location.state.userId, name: location.state.userName || '' });
    }
  }, [location]);

  useEffect(() => {
    if (!token) return navigate('/login');
    fetchConversations();
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, [token]);

  const fetchConversations = async () => {
    try {
      const res = await messagesAPI.getConversations(token);
      setConversations(res.conversations || []);
      setUnreadTotal(res.unreadTotal || 0);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  const fetchMessages = async () => {
    if (!selectedUser) return;
    try {
      const res = await messagesAPI.getMessages(token, selectedUser._id);
      setMessages(res.messages || []);
      await messagesAPI.markAllRead(token, selectedUser._id);
      fetchConversations();
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedUser) return;
    try {
      const res = await messagesAPI.sendMessage(token, selectedUser._id, messageText);
      if (res.message) {
        setMessages(prev => [...prev, res.message]);
        setMessageText('');
        fetchConversations();
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUserInitials = (name) => name ? name.split(' ').map(p => p[0]).join('').toUpperCase() : '';

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading conversations...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 pt-16 md:pt-0">
      {/* Conversations Sidebar */}
      <div className={`w-full md:w-80 bg-white border-r border-gray-200 flex flex-col ${selectedUser ? "hidden md:flex" : "flex"}`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p className="mb-2">No conversations yet</p>
              <p className="text-sm">Start messaging with found/lost item posters</p>
            </div>
          ) : (
            filteredConversations.map(conv => (
              <div
                key={conv._id}
                onClick={() => setSelectedUser(conv)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition ${
                  selectedUser?._id === conv._id
                    ? "bg-blue-50 border-l-4 border-l-blue-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {getUserInitials(conv.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm">{conv.name}</p>
                      <p className="text-xs text-gray-500 truncate">{conv.email}</p>
                    </div>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(conv.lastMessageTime).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      {selectedUser ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white sticky top-0 flex items-center space-x-3">
            <button
              onClick={() => setSelectedUser(null)}
              className="md:hidden text-blue-600 mr-2"
            >
              ← Back
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              {getUserInitials(selectedUser.name)}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{selectedUser.name}</p>
              <p className="text-xs text-gray-500">{selectedUser.email}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isOwn = msg.sender._id === getCurrentUserId();
                return (
                  <div key={idx} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        isOwn
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p className="break-words">{msg.text}</p>
                      <p className={`text-xs mt-1 ${isOwn ? "text-blue-100" : "text-gray-500"}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
            <div className="flex space-x-3">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!messageText.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a conversation</h3>
            <p className="text-gray-600">Choose a user to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}
