# QUICKSTART.md - Get Running in 5 Minutes

## ⚡ Quick Start Guide

### Prerequisites Check
- [ ] Node.js installed? Run: `node --version` (v14+)
- [ ] MongoDB installed? Run: `mongod --version` (v4.0+)
- [ ] npm installed? Run: `npm --version`

---

## 🚀 Step 1: Start MongoDB (Terminal 1)

```bash
mongod
```

**Expected Output:** `waiting for connections on port 27017`

---

## 🚀 Step 2: Start Backend (Terminal 2)

```bash
cd backend
npm install
npm start
```

**Expected Output:** `Server running on port 5000`

---

## 🚀 Step 3: Start Frontend (Terminal 3)

```bash
cd frontend
python -m http.server 8000
```

**Expected Output:** `Serving HTTP on 0.0.0.0 port 8000`

---

## 🚀 Step 4: Open Browser

Visit: **http://localhost:8000**

---

## 🔓 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Superadmin** | admin@vala.com | password123 |
| **Admin** | admin.user@vala.com | password123 |

---

## 📱 First Time Setup

1. **Login** with superadmin credentials
2. **Dashboard** - See overview
3. **Products** - View sample products (created automatically)
4. **Inventory** - View stock levels
5. **Admin Management** - Create new admin (superadmin only)

---

## 🎯 Common Tasks

### Create a New Product
```
Products → + Add Product → Fill form → Save
```

### Record Stock Movement
```
Inventory → + Record Transaction → Fill details → Save
```

### Create New Admin
```
Admin Management → + Create Admin → Fill form → Save
(Only available to Superadmin)
```

### View Stock Report
```
Inventory → Stock Report tab
```

---

## 🛑 Stop Services

Press `Ctrl+C` in each terminal to stop services

---

## ⚠️ Troubleshooting

### "MongoDB Connection Error"
→ Make sure MongoDB is running in Terminal 1

### "Port 5000 Already in Use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <number> /F

# Mac/Linux
lsof -i :5000
kill -9 <number>
```

### "CORS Error"
→ Restart both backend and frontend services

### "Login Failed"
→ Clear browser cache (Ctrl+Shift+Delete) and try again

---

## 📚 Next Steps

- Read [README.md](README.md) for detailed info
- Check [API_REFERENCE.md](API_REFERENCE.md) for API docs
- Review [DOCUMENTATION.md](DOCUMENTATION.md) for complete guide
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options

---

## 🎓 System Overview

```
Frontend (Port 8000)  →  Backend API (Port 5000)  →  MongoDB (Port 27017)
  HTML/CSS/JS            Express.js REST API        NoSQL Database
```

---

## ✨ Features at a Glance

✅ Role-based access (Superadmin, Admin, Staff)
✅ Real-time dashboard
✅ Product management
✅ Inventory tracking
✅ Stock reporting
✅ User management
✅ Secure login
✅ Responsive design

---

## 🔒 Security Notes

- Never commit `.env` file
- Change JWT_SECRET in production
- Always use HTTPS in production
- Keep Node.js and packages updated
- Use strong passwords

---

## 📞 Help

- Check logs in Terminal 2 (Backend) for errors
- Use browser DevTools (F12) to check frontend errors
- Test API with curl or Postman
- Review error messages carefully

---

## Ready? Let's Go! 🎉

1. Open 3 terminals
2. Run MongoDB in Terminal 1
3. Run Backend in Terminal 2
4. Run Frontend in Terminal 3
5. Visit http://localhost:8000
6. Login and explore!

**Happy Coding! 🚀**
