# API Quick Reference - Software Vala Inventory

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### Register User
```
POST /auth/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response: { token, user }
```

### Login
```
POST /auth/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
Response: { token, user }
```

### Get Current User
```
GET /auth/me
Headers: Authorization: Bearer <token>
Response: { user }
```

## Admin Endpoints

### Create Admin (Superadmin only)
```
POST /admin/create-admin
Headers: Authorization: Bearer <token>
Body: {
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### Get All Users
```
GET /admin/users
Headers: Authorization: Bearer <token>
Response: { users: [...] }
```

### Get User by ID
```
GET /admin/users/:id
Headers: Authorization: Bearer <token>
Response: { user }
```

### Update User
```
PUT /admin/users/:id
Headers: Authorization: Bearer <token>
Body: {
  "name": "Updated Name",
  "status": "active",
  "phone": "+1234567890"
}
```

### Delete User (Superadmin only)
```
DELETE /admin/users/:id
Headers: Authorization: Bearer <token>
```

## Product Endpoints

### Create Product (Admin only)
```
POST /products
Headers: Authorization: Bearer <token>
Body: {
  "productName": "Laptop",
  "productCode": "LAP-001",
  "category": "Electronics",
  "description": "High-performance laptop",
  "purchasePrice": 600,
  "sellingPrice": 899,
  "minStock": 5,
  "unit": "pcs",
  "supplier": {
    "name": "Tech Supplier",
    "email": "supplier@email.com",
    "phone": "+1234567890",
    "address": "123 Main St"
  }
}
```

### Get All Products
```
GET /products
Headers: Authorization: Bearer <token>
Response: { products: [...] }
```

### Get Product by ID
```
GET /products/:id
Headers: Authorization: Bearer <token>
Response: { product }
```

### Update Product (Admin only)
```
PUT /products/:id
Headers: Authorization: Bearer <token>
Body: {
  "productName": "Updated Name",
  "sellingPrice": 899,
  "status": "active"
}
```

### Delete Product (Admin only)
```
DELETE /products/:id
Headers: Authorization: Bearer <token>
```

## Inventory Endpoints

### Record Transaction
```
POST /inventory
Headers: Authorization: Bearer <token>
Body: {
  "productId": "product_id",
  "transactionType": "in|out|adjustment",
  "quantity": 10,
  "reference": "PO-001",
  "notes": "Stock received from supplier"
}
```

### Get All Transactions
```
GET /inventory
Headers: Authorization: Bearer <token>
Response: { transactions: [...] }
```

### Get Product Transactions
```
GET /inventory/product/:productId
Headers: Authorization: Bearer <token>
Response: { transactions: [...] }
```

### Get Inventory Report
```
GET /inventory/report
Headers: Authorization: Bearer <token>
Response: { report: [...] }
```

## Sales Endpoints

### Create Sale
```
POST /sales
Headers: Authorization: Bearer <token>
Body: {
  "items": [
    {
      "product": "product_id",
      "quantity": 2,
      "unitPrice": 899,
      "total": 1798
    }
  ],
  "discount": 100,
  "tax": 180,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1234567890",
  "paymentMethod": "card"
}
```

### Get All Sales
```
GET /sales
Headers: Authorization: Bearer <token>
Response: { sales: [...] }
```

### Get Sales Summary
```
GET /sales/summary
Headers: Authorization: Bearer <token>
Response: {
  totalSales,
  totalRevenue,
  completedSales,
  averageOrder
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Status Codes

- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Common Headers

```
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

## Role Permissions

| Endpoint | Superadmin | Admin | Staff |
|----------|-----------|-------|-------|
| Create Admin | ✓ | ✗ | ✗ |
| Create Product | ✓ | ✓ | ✗ |
| View Products | ✓ | ✓ | ✓ |
| Record Inventory | ✓ | ✓ | ✓ |
| View Reports | ✓ | ✓ | ✓ |
| Delete User | ✓ | ✗ | ✗ |

## Example Usage with Curl

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@vala.com","password":"password123"}'
```

### Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "productName": "Test",
    "productCode": "TEST-001",
    "category": "Test",
    "purchasePrice": 100,
    "sellingPrice": 150,
    "minStock": 5
  }'
```

### Record Transaction
```bash
curl -X POST http://localhost:5000/api/inventory \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "productId": "PRODUCT_ID",
    "transactionType": "in",
    "quantity": 50,
    "reference": "PO-001"
  }'
```

## Pagination (Future Feature)

```
GET /products?page=1&limit=10&sort=-createdAt
```

## Filtering (Future Feature)

```
GET /products?category=Electronics&status=active
GET /inventory?transactionType=out&startDate=2024-01-01
```

## Environment Variables for API

```env
API_BASE_URL=http://localhost:5000/api
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

## Error Codes

| Code | Message |
|------|---------|
| 1001 | Invalid credentials |
| 1002 | User not found |
| 1003 | Product code already exists |
| 1004 | Insufficient stock |
| 1005 | Invalid role |
| 1006 | Unauthorized access |

## Rate Limiting

Not implemented in v1.0, planned for v1.5
Current limits: None (production needs limits)

## Versioning

Current Version: v1.0.0
