# Software Vala Inventory - Setup Guide

## Quick Start (5 minutes)

### Step 1: Install MongoDB

#### Option A: Local MongoDB
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

#### Option B: MongoDB Atlas (Cloud)
- Create account: https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (already created, verify settings)
# Update MONGODB_URI if using MongoDB Atlas

# Start backend server
npm start
```

Backend will run on: http://localhost:5000

### Step 3: Frontend Setup

#### Option A: Using Python
```bash
cd frontend
python -m http.server 8000
```
Visit: http://localhost:8000

#### Option B: Using Node
```bash
npm install -g http-server
cd frontend
http-server
```

### Step 4: Initialize Sample Data

```bash
# From project root
node scripts/initialize-data.js
```

This will create:
- Superadmin account
- Admin account
- Sample products with stock

### Step 5: Login

Use these credentials:
- **Superadmin:** admin@vala.com / password123
- **Admin:** admin.user@vala.com / password123

## Detailed Setup

### MongoDB Setup

#### Local Installation
```bash
# Windows - Download from MongoDB Community
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Linux
sudo apt-get install -y mongodb

# Start MongoDB
mongod
```

#### Verify Connection
```bash
# In another terminal
mongo
```

### Environment Variables

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vala-inventory
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
BCRYPT_ROUNDS=10
NODE_ENV=development
```

### API Testing

Use Postman or curl:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@vala.com",
    "password": "password123"
  }'

# Create Product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "productName": "Test Product",
    "productCode": "TEST-001",
    "category": "Test",
    "purchasePrice": 100,
    "sellingPrice": 150,
    "minStock": 5
  }'
```

## Project Deployment

### Option 1: Using Heroku

```bash
# Backend deployment
cd backend
heroku create your-app-name
git push heroku main
```

### Option 2: Using AWS/Azure

Create EC2 instance and:
```bash
git clone your-repo
cd vala-inventory/backend
npm install
npm start
```

### Option 3: Using Docker

```dockerfile
# Dockerfile in backend
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** 
- Start MongoDB service
- Check connection string in .env
- Verify MongoDB is installed

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:**
- Backend must be on different port (5000)
- Frontend on another port (8000)
- Already configured in code

### Port Already in Use
```bash
# Kill process on port
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Token Expired
- Clear browser localStorage: Press F12 > Application > Clear Storage
- Login again

## File Permissions

Ensure proper access:
```bash
chmod 644 backend/.env
chmod 755 backend/
chmod 755 frontend/
```

## Development Tips

### Enable Debug Logging
Add to `backend/server.js`:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

### Test Data Generation
```bash
node scripts/initialize-data.js
```

### API Endpoint Testing
Use the initialize script as reference for API calls

## Production Checklist

- [ ] Change JWT_SECRET
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure database backups
- [ ] Set up error logging
- [ ] Implement rate limiting
- [ ] Configure CORS for production domain
- [ ] Set up monitoring
- [ ] Enable SSL certificates
- [ ] Configure CDN for static files

## Performance Optimization

### Backend
```javascript
// Add compression
const compression = require('compression');
app.use(compression());

// Add rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
```

### Frontend
- Minify CSS/JS
- Enable gzip compression
- Use CDN for assets
- Implement caching headers

## Support Resources

- MongoDB: https://docs.mongodb.com/
- Express.js: https://expressjs.com/
- JWT: https://jwt.io/
- Node.js: https://nodejs.org/docs/

## Contact & Support

Email: support@vala.com
Website: https://www.software-vala.com/
