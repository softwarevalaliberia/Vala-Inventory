# Software Vala Inventory Management System

A comprehensive, full-stack inventory management system with superadmin and admin roles, built with Node.js/Express backend and vanilla JavaScript frontend.

## System Architecture

### Backend
- **Runtime:** Node.js with Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs for password hashing
- **Port:** 5000

### Frontend
- **Technology:** HTML5, CSS3, JavaScript
- **Design:** Blue and white professional dashboard
- **Architecture:** Modular with API service and UI manager classes
- **Storage:** LocalStorage for token management

## Project Structure

```
vala-inventory/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── productController.js
│   │   └── inventoryController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Inventory.js
│   │   └── Sale.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── productRoutes.js
│   │   └── inventoryRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── api.js
│   │   └── utils.js
│   ├── pages/
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   ├── products.html
│   │   ├── inventory.html
│   │   └── admin-management.html
│   └── index.html
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables (.env):**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/vala-inventory
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   JWT_EXPIRE=7d
   BCRYPT_ROUNDS=10
   NODE_ENV=development
   ```

4. **Start the backend server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

### Frontend Setup

1. **Open the application:**
   - Open `frontend/index.html` in your web browser
   - Or use a local web server (recommended)

2. **Using Python's built-in server:**
   ```bash
   # From the frontend directory
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Using Node's http-server:**
   ```bash
   npm install -g http-server
   cd frontend
   http-server
   ```

## API Documentation

### Authentication Endpoints

#### POST `/api/auth/login`
Login with email and password
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/register`
Register new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Admin Endpoints

#### POST `/api/admin/create-admin`
Create new admin (Superadmin only)
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

#### GET `/api/admin/users`
Get all users

#### GET `/api/admin/users/:id`
Get user by ID

#### PUT `/api/admin/users/:id`
Update user

#### DELETE `/api/admin/users/:id`
Delete user (Superadmin only)

### Product Endpoints

#### POST `/api/products`
Create product (Admin only)

#### GET `/api/products`
Get all products

#### GET `/api/products/:id`
Get product by ID

#### PUT `/api/products/:id`
Update product (Admin only)

#### DELETE `/api/products/:id`
Delete product (Admin only)

### Inventory Endpoints

#### POST `/api/inventory`
Record inventory transaction

#### GET `/api/inventory`
Get all transactions

#### GET `/api/inventory/product/:productId`
Get product transactions

#### GET `/api/inventory/report`
Get inventory report

## User Roles & Permissions

### Superadmin
- Create admin accounts
- Manage all users
- View all reports
- Full system access

### Admin
- Create and manage staff
- Manage products
- Record inventory transactions
- View all reports

### Staff
- View inventory
- View products
- Limited access to reports

## Features

### Dashboard
- Real-time inventory metrics
- Total stock value
- Low stock alerts
- Recent transactions
- Active user count

### Product Management
- Add/edit/delete products
- Set purchase and selling prices
- Track supplier information
- Manage stock levels
- Category organization

### Inventory Management
- Record stock in/out transactions
- Inventory adjustments
- Transaction history
- Stock level reports
- Low inventory alerts

### Admin Management
- Create admin accounts (Superadmin)
- Manage user status
- View user information
- Edit user details
- Delete users (Superadmin)

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (RBAC)
- Protected API endpoints
- Environment variable configuration
- Input validation

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Superadmin | admin@vala.com | password123 |
| Admin | admin.user@vala.com | password123 |

## Database Schema

### User
- name, email, password, role, status
- phone, address, city, state, country, zipCode
- createdBy (reference to creator)
- timestamps

### Product
- productName, productCode, category, description
- purchasePrice, sellingPrice
- currentStock, minStock, unit
- supplier (embedded: name, email, phone, address)
- status (active/inactive)
- timestamps

### Inventory
- product (reference to Product)
- transactionType (in/out/adjustment)
- quantity, reference, notes
- balanceBefore, balanceAfter
- recordedBy (reference to User)
- timestamps

### Sale
- saleNumber, items array
- totalAmount, discount, tax, finalAmount
- customer info (name, email, phone)
- paymentMethod, status
- recordedBy
- timestamps

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in .env
- Verify network connectivity

### CORS Errors
- Ensure backend is running on port 5000
- Frontend should be on different port (8000+)
- Check CORS configuration in server.js

### Token Expired
- Clear browser localStorage
- Login again to get new token
- Check JWT_EXPIRE setting

## Future Enhancements

- Sales and invoicing module
- Advanced reporting and analytics
- Barcode scanning
- Multi-warehouse support
- Supplier management module
- Purchase order system
- Email notifications
- Two-factor authentication
- API rate limiting
- Database backup automation

## Performance Optimization

- Implement caching layer
- Database indexing
- Query optimization
- Frontend bundle optimization
- CDN for static assets

## Contributing

1. Create feature branches
2. Follow code style guidelines
3. Write unit tests
4. Submit pull requests

## License

MIT License - Feel free to use this project for personal or commercial purposes

## Support

For support, email: support@vala.com
