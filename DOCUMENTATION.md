# Software Vala Inventory Management System
## Complete System Documentation

---

## 📋 Table of Contents
1. System Overview
2. Architecture
3. Installation Guide
4. User Guide
5. API Documentation
6. Troubleshooting
7. Advanced Configuration

---

## 1. System Overview

### Project Name
**Software Vala Inventory Management System**

### Description
A comprehensive, production-ready inventory management system built with modern web technologies. Features complete role-based access control, real-time inventory tracking, product management, and detailed reporting.

### Key Features
✓ Role-based Access Control (Superadmin, Admin, Staff)
✓ Secure Authentication with JWT
✓ Real-time Dashboard with Key Metrics
✓ Product Management System
✓ Inventory Transaction Tracking
✓ Stock Level Reporting
✓ Low Stock Alerts
✓ User Management
✓ Admin Creation (Superadmin Only)
✓ Professional Blue & White UI

### Technology Stack

**Backend:**
- Node.js v14+
- Express.js 4.18
- MongoDB 4.0+
- JWT Authentication
- bcryptjs for Password Hashing

**Frontend:**
- HTML5
- CSS3 (Responsive Design)
- Vanilla JavaScript (ES6+)
- RESTful API Integration

**Database:**
- MongoDB (NoSQL)
- Mongoose ODM

---

## 2. Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Login      │  │  Dashboard   │  │  Admin Mgmt  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │  Products    │  │  Inventory   │                         │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
            │                      │
            └──────────────────────┘
                      │
         ┌────────────▼────────────┐
         │   API Gateway (CORS)    │
         └────────────┬────────────┘
                      │
┌─────────────────────▼─────────────────────────────────────────┐
│                  API LAYER (Express.js)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Auth       │  │  Admin       │  │  Products    │         │
│  │  Endpoints   │  │  Endpoints   │  │  Endpoints   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│  ┌──────────────┐  ┌──────────────┐                           │
│  │  Inventory   │  │  Sales       │                           │
│  │  Endpoints   │  │  Endpoints   │                           │
│  └──────────────┘  └──────────────┘                           │
└─────────────────────┬──────────────────────────────────────────┘
                      │
         ┌────────────▼────────────┐
         │   Authentication        │
         │   Middleware (JWT)      │
         └────────────┬────────────┘
                      │
┌─────────────────────▼──────────────────────────────────────────┐
│               BUSINESS LOGIC LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Auth        │  │  Admin       │  │  Product     │         │
│  │  Controller  │  │  Controller  │  │  Controller  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│  ┌──────────────┐  ┌──────────────┐                           │
│  │  Inventory   │  │  Sale        │                           │
│  │  Controller  │  │  Controller  │                           │
│  └──────────────┘  └──────────────┘                           │
└─────────────────────┬──────────────────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────────────────┐
│                  DATA LAYER (Mongoose)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  User        │  │  Product     │  │  Inventory   │         │
│  │  Schema      │  │  Schema      │  │  Schema      │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│  ┌──────────────┐                                             │
│  │  Sale        │                                             │
│  │  Schema      │                                             │
│  └──────────────┘                                             │
└─────────────────────┬──────────────────────────────────────────┘
                      │
         ┌────────────▼────────────┐
         │   MongoDB Database      │
         │   vala-inventory (DB)   │
         └────────────────────────┘
```

### Data Models

#### User Model
```
User
├── name (String)
├── email (String, Unique)
├── password (String, Hashed)
├── role (String: superadmin|admin|staff)
├── status (String: active|inactive)
├── phone (String)
├── address (String)
├── city (String)
├── state (String)
├── country (String)
├── zipCode (String)
├── createdBy (ObjectId -> User)
└── timestamps
```

#### Product Model
```
Product
├── productName (String)
├── productCode (String, Unique)
├── category (String)
├── description (String)
├── purchasePrice (Number)
├── sellingPrice (Number)
├── currentStock (Number)
├── minStock (Number)
├── unit (String)
├── status (String: active|inactive)
├── supplier (Embedded)
│   ├── name (String)
│   ├── email (String)
│   ├── phone (String)
│   └── address (String)
├── createdBy (ObjectId -> User)
└── timestamps
```

#### Inventory Model
```
Inventory
├── product (ObjectId -> Product)
├── transactionType (String: in|out|adjustment)
├── quantity (Number)
├── reference (String)
├── notes (String)
├── recordedBy (ObjectId -> User)
├── balanceBefore (Number)
├── balanceAfter (Number)
└── timestamps
```

#### Sale Model
```
Sale
├── saleNumber (String, Unique)
├── items (Array)
│   ├── product (ObjectId -> Product)
│   ├── quantity (Number)
│   ├── unitPrice (Number)
│   └── total (Number)
├── totalAmount (Number)
├── discount (Number)
├── tax (Number)
├── finalAmount (Number)
├── customerName (String)
├── customerEmail (String)
├── customerPhone (String)
├── paymentMethod (String)
├── status (String: pending|completed|cancelled)
├── recordedBy (ObjectId -> User)
└── timestamps
```

---

## 3. Installation Guide

### Prerequisites
- Node.js v14 or higher
- MongoDB v4.0 or higher
- npm or yarn
- Git (optional)
- Postman (optional, for API testing)

### Step-by-Step Installation

#### 1. Backend Setup

```bash
# Step 1: Navigate to backend directory
cd backend

# Step 2: Install all dependencies
npm install

# Step 3: Create and configure .env file
# Already created, but verify these settings:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vala-inventory
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
NODE_ENV=development

# Step 4: Start MongoDB (in another terminal)
mongod

# Step 5: Start backend server
npm start
# Output should show: "Server running on port 5000"
```

#### 2. Frontend Setup

```bash
# Option A: Using Python (Recommended)
cd frontend
python -m http.server 8000
# Visit: http://localhost:8000

# Option B: Using Node http-server
npm install -g http-server
cd frontend
http-server
# Visit: http://localhost:8080
```

#### 3. Initialize Sample Data

```bash
# From project root directory
node scripts/initialize-data.js
```

This will create:
- Superadmin account
- Admin account
- 5 sample products
- Initial stock entries

---

## 4. User Guide

### 4.1 Superadmin Features

**Login Credentials:**
- Email: admin@vala.com
- Password: password123

**Available Features:**
1. **Dashboard** - View all system metrics and reports
2. **Create Admin Accounts** - Only superadmin can create new admins
3. **User Management** - View, edit, delete all users
4. **Product Management** - Create, update, delete products
5. **Inventory Control** - Full access to inventory operations
6. **View Reports** - Access all system reports

**Key Actions:**
- Go to Admin Management → Click "Create Admin"
- Fill in admin details and credentials
- New admin can immediately login

### 4.2 Admin Features

**Default Admin Credentials:**
- Email: admin.user@vala.com
- Password: password123

**Available Features:**
1. **Dashboard** - View dashboard metrics
2. **Product Management** - Manage products (add/edit/delete)
3. **Inventory Management** - Record transactions, view stock
4. **Staff Management** - View and manage staff accounts
5. **Reports** - Generate inventory reports

**Common Tasks:**
- Add new product: Products → Add Product
- Record stock movement: Inventory → Record Transaction
- View stock levels: Inventory → Stock Report

### 4.3 Staff Features

**Features Available:**
1. **Dashboard** - View read-only metrics
2. **Product Viewing** - View product catalog
3. **Inventory Viewing** - View inventory transactions
4. **Report Viewing** - View reports

---

## 5. API Documentation

### 5.1 Authentication API

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@vala.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "Admin User",
    "email": "admin@vala.com",
    "role": "superadmin"
  }
}
```

### 5.2 Product API

#### Create Product
```
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "productName": "Laptop",
  "productCode": "LAP-001",
  "category": "Electronics",
  "purchasePrice": 600,
  "sellingPrice": 899,
  "minStock": 5
}
```

#### Get All Products
```
GET /api/products
Authorization: Bearer <token>

Response:
{
  "success": true,
  "count": 5,
  "products": [...]
}
```

### 5.3 Inventory API

#### Record Transaction
```
POST /api/inventory
Authorization: Bearer <token>

{
  "productId": "product_id",
  "transactionType": "in",
  "quantity": 50,
  "reference": "PO-001",
  "notes": "Received from supplier"
}
```

#### Get Inventory Report
```
GET /api/inventory/report
Authorization: Bearer <token>

Response:
{
  "success": true,
  "report": [
    {
      "productName": "Laptop",
      "currentStock": 10,
      "minStock": 5,
      "status": "In Stock",
      "totalValue": 6000
    }
  ]
}
```

---

## 6. Troubleshooting

### Common Issues & Solutions

#### Issue: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
1. Verify MongoDB is installed: `mongod --version`
2. Start MongoDB: `mongod`
3. Check connection string in .env

#### Issue: Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

#### Issue: CORS Errors
```
Access to XMLHttpRequest blocked by CORS
```
**Solution:**
- Ensure backend runs on port 5000
- Frontend runs on different port (8000+)
- Check backend CORS configuration

#### Issue: Login Failed
**Solution:**
1. Check email spelling
2. Verify password is correct
3. Check if account is active
4. Clear browser cache: Ctrl+Shift+Delete
5. Clear localStorage: F12 → Application → Clear Storage

---

## 7. Advanced Configuration

### 7.1 Production Deployment

#### Environment Setup
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/vala-inventory
JWT_SECRET=use_a_very_strong_random_secret_key_here
CORS_ORIGIN=https://yourdomain.com
```

#### Security Measures
1. Change default JWT_SECRET
2. Enable HTTPS/SSL
3. Set up database backups
4. Enable rate limiting
5. Configure firewall rules
6. Use environment variables
7. Enable logging

#### Database Optimization
```javascript
// Add indexes
db.products.createIndex({ productCode: 1 })
db.users.createIndex({ email: 1 })
db.inventory.createIndex({ product: 1, createdAt: -1 })
```

### 7.2 Scaling Considerations

**Vertical Scaling:**
- Increase server resources
- Optimize database queries
- Implement caching

**Horizontal Scaling:**
- Use load balancer
- Multiple backend instances
- MongoDB replica sets

### 7.3 Monitoring & Logging

```javascript
// Add to backend for logging
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

---

## Summary

This comprehensive inventory management system provides:
- ✓ Complete role-based access control
- ✓ RESTful API backend
- ✓ Professional responsive frontend
- ✓ Real-time inventory tracking
- ✓ Detailed reporting and analytics
- ✓ Secure authentication
- ✓ Production-ready code

For questions or support: support@vala.com

---

*Last Updated: May 2026*
*Version: 1.0.0*
