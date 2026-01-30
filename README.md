# FindIt – Lost & Found System

A modern, full-stack Lost & Found platform for reporting and recovering lost items. Connect with your community to reunite lost belongings with their owners.

## 🚀 Features

### User Features
- 🔐 **User Authentication** - Secure login/registration with JWT (Phase 1)
- ✉️ **Email Verification** - Verify email on signup with token validation (Phase 1)
- 🔑 **Password Reset** - Forgot password flow with email recovery (Phase 1)
- 📝 **Report Lost Items** - Post detailed information about lost items
- 🎁 **Report Found Items** - List items you found to help owners
- 🔍 **Smart Matching** - Automatic matching of lost and found items by category and location
- 👤 **User Profile** - Manage profile, view your posts, track statistics
- 💬 **Direct Messaging** - Real-time messaging with users about items (Phase 2)
- 🔔 **Notifications** - Get notified when items match or others interact
- 📱 **Image Upload** - Upload photos of items (via Cloudinary)
- 📊 **Dashboard** - Browse all items with filtering options

### Admin Features
- 👨‍💼 **Manage Reports** - View and moderate all posts
- 🗑️ **Delete Reports** - Remove inappropriate content

## 📁 Project Structure

```
findit-lost-and-found/
├── clients/             # Main React + Vite frontend
│   ├── src/
│   │   ├── pages/      # Login, Register, Dashboard, Profile, PostLost, PostFound, ItemDetail, Messaging
│   │   ├── components/ # Sidebar, Navbar, Hero, FeaturesSection
│   │   ├── services/   # API integration (auth, items, notifications, messages)
│   │   └── index.css   # Tailwind styles
│   └── package.json
└── server/              # Node.js + Express backend
    ├── models/         # User, LostItem, FoundItem, Notification, Message schemas
    ├── routes/         # Auth, Items, Admin, Notifications, Messages routes
    ├── controllers/    # Business logic
    ├── middlewares/    # Auth, Admin, Upload
    ├── utils/          # Cloudinary, Email service
    └── server.js       # Main server file
```

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Lucide Icons

**Backend:**
- Node.js
- Express 5.2.1
- MongoDB 9.1.5
- Mongoose
- JWT Authentication
- Bcryptjs 3.0.3 (Password hashing)
- Multer 2.0.2 (File upload)
- Cloudinary (Image storage)
- Nodemailer 6.9.7 (Email service with Gmail SMTP)

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- MongoDB database
- Cloudinary account (for image uploads)

### Backend Setup

```bash
cd server
npm install

# Create .env file
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name

npm run dev  # Start with nodemon
# or
npm start    # Start normally
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd clients
npm install
npm run dev
```

Frontend runs on `http://localhost:3002` (or next available port)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user with email verification
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-email` - Verify email token (Phase 1)
- `POST /api/auth/forgot-password` - Request password reset email (Phase 1)
- `POST /api/auth/reset-password` - Reset password with token (Phase 1)
- `GET /api/auth/profile` - Get user profile + stats
- `PUT /api/auth/profile` - Update user profile

### Items
- `GET /api/items/lost` - Get all lost items
- `GET /api/items/found` - Get all found items
- `GET /api/items/lost/:id` - Get lost item details
- `GET /api/items/found/:id` - Get found item details
- `POST /api/items/lost` - Create lost item (auth required)
- `POST /api/items/found` - Create found item (auth required)
- `PUT /api/items/lost/:id` - Update lost item (auth required)
- `PUT /api/items/found/:id` - Update found item (auth required)
- `DELETE /api/items/lost/:id` - Delete lost item (auth required)
- `DELETE /api/items/found/:id` - Delete found item (auth required)
- `GET /api/items/match` - Get matching lost and found items

### Notifications
- `GET /api/notifications` - Get user notifications (auth required)
- `PUT /api/notifications/:id/read` - Mark as read (auth required)
- `PUT /api/notifications/read-all` - Mark all as read (auth required)
- `DELETE /api/notifications/:id` - Delete notification (auth required)

### Messaging (Phase 2)
- `GET /api/messages/conversations` - Get all conversations with unread count
- `GET /api/messages/messages/:userId` - Get message history with user
- `POST /api/messages/send` - Send a new message
- `PUT /api/messages/mark-read/:messageId` - Mark message as read
- `PUT /api/messages/mark-all-read/:userId` - Mark all messages from user as read
- `DELETE /api/messages/:messageId` - Delete a message (sender only)

### Admin
- `GET /api/admin/reports` - Get all reports (admin required)
- `DELETE /api/admin/report/:id` - Delete report (admin required)

## 🎨 Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | User login with forgot password link (Phase 1) |
| Register | `/register` | New user signup with email verification (Phase 1) |
| Verify Email | `/verify-email/:token` | Verify email address (Phase 1) |
| Forgot Password | `/forgot-password` | Request password reset (Phase 1) |
| Reset Password | `/reset-password/:token` | Reset password with token (Phase 1) |
| Dashboard | `/dashboard` | Browse all items with filtering |
| Profile | `/profile` | User profile & manage items |
| Post Lost | `/post-lost` | Report lost item |
| Post Found | `/post-found` | Report found item |
| Item Detail | `/item/:type/:id` | View item details with contact button |
| Messaging | `/messages` | Direct messaging with other users (Phase 2) |

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes on frontend
- Admin middleware for sensitive operations
- CORS enabled

## 📋 Workflow

1. **User Registration** → Creates account
2. **Post Item** → Upload lost/found item with images
3. **Smart Matching** → System finds potential matches
4. **Notifications** → Users get notified of matches
5. **Contact** → View owner details and get in touch
6. **Resolution** → Mark item as resolved

## 🚧 Future Enhancements

### Phase 3: Real-time Messaging Upgrade
- [ ] WebSocket integration (Socket.io) for true real-time updates
- [ ] Typing indicators
- [ ] Online/offline status
- [ ] Message read receipts

### Additional Features
- [ ] Push notifications (browser & mobile)
- [ ] Item status tracking (Lost/Found/Resolved)
- [ ] User ratings and reviews
- [ ] Email notifications for matches
- [ ] Mobile app (React Native)
- [ ] Map integration for item locations
- [ ] Advanced search filters
- [ ] Message reactions/emojis
- [ ] Image/file sharing in messages

## 📝 License

MIT License

## 👤 Author

Created with ❤️ for community reunification

---

**Happy Finding! 🎉**

---

## 📚 Documentation

- [Phase 2 Summary](./PHASE_2_SUMMARY.md) - Detailed implementation guide
- [Phase 2 Testing Guide](./PHASE_2_TESTING.md) - Test scenarios and edge cases
- [Project Status](./PROJECT_STATUS.md) - Complete project overview
