// This script creates initial superadmin and sample data
// Run this after starting your backend server

const API_BASE_URL = 'http://localhost:5000/api';

async function initializeData() {
  console.log('Initializing Software Vala Inventory System...\n');

  try {
    // 1. Create Superadmin
    console.log('Creating Superadmin account...');
    const superadminResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Superadmin User',
        email: 'admin@vala.com',
        password: 'password123'
      })
    });

    const superadminData = await superadminResponse.json();
    if (!superadminData.success) {
      console.log('Superadmin already exists or creation failed');
    } else {
      console.log('✓ Superadmin created:', superadminData.user.email);
    }

    // 2. Create Admin
    console.log('\nCreating Admin account...');
    const adminResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Admin User',
        email: 'admin.user@vala.com',
        password: 'password123'
      })
    });

    const adminData = await adminResponse.json();
    if (!adminData.success) {
      console.log('Admin already exists or creation failed');
    } else {
      console.log('✓ Admin created:', adminData.user.email);
    }

    // 3. Login to get token
    console.log('\nLogging in as admin...');
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin.user@vala.com',
        password: 'password123'
      })
    });

    const loginData = await loginResponse.json();
    if (!loginData.success) {
      console.log('Login failed');
      return;
    }

    const token = loginData.token;
    console.log('✓ Login successful');

    // 4. Create sample products
    console.log('\nCreating sample products...');
    const products = [
      {
        productName: 'Laptop',
        productCode: 'LAP-001',
        category: 'Electronics',
        description: 'High-performance laptop',
        purchasePrice: 600,
        sellingPrice: 899,
        minStock: 5,
        unit: 'pcs',
        supplier: {
          name: 'Tech Supplier Inc',
          email: 'tech@supplier.com',
          phone: '+1-800-123-4567',
          address: '123 Tech Street'
        }
      },
      {
        productName: 'USB Cable',
        productCode: 'USB-001',
        category: 'Accessories',
        description: '2m USB-C cable',
        purchasePrice: 2,
        sellingPrice: 4.99,
        minStock: 50,
        unit: 'pcs',
        supplier: {
          name: 'Cable World',
          email: 'sales@cableworld.com',
          phone: '+1-800-999-8888',
          address: '456 Cable Ave'
        }
      },
      {
        productName: 'Wireless Mouse',
        productCode: 'MOU-001',
        category: 'Accessories',
        description: 'Ergonomic wireless mouse',
        purchasePrice: 15,
        sellingPrice: 29.99,
        minStock: 20,
        unit: 'pcs',
        supplier: {
          name: 'Tech Supplier Inc',
          email: 'tech@supplier.com',
          phone: '+1-800-123-4567',
          address: '123 Tech Street'
        }
      },
      {
        productName: 'Monitor',
        productCode: 'MON-001',
        category: 'Electronics',
        description: '27-inch 4K Monitor',
        purchasePrice: 250,
        sellingPrice: 399.99,
        minStock: 5,
        unit: 'pcs',
        supplier: {
          name: 'Display Tech',
          email: 'info@displaytech.com',
          phone: '+1-800-555-1234',
          address: '789 Display Blvd'
        }
      },
      {
        productName: 'Mechanical Keyboard',
        productCode: 'KEY-001',
        category: 'Accessories',
        description: 'RGB Mechanical Gaming Keyboard',
        purchasePrice: 80,
        sellingPrice: 129.99,
        minStock: 10,
        unit: 'pcs',
        supplier: {
          name: 'Peripheral Plus',
          email: 'sales@peripheralplus.com',
          phone: '+1-800-777-6666',
          address: '321 Gaming Lane'
        }
      }
    ];

    for (const product of products) {
      const productResponse = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      const productData = await productResponse.json();
      if (productData.success) {
        console.log(`✓ Product created: ${product.productName}`);

        // Add initial stock
        await fetch(`${API_BASE_URL}/inventory`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: productData.product._id,
            transactionType: 'in',
            quantity: 100,
            reference: 'INIT-001',
            notes: 'Initial stock entry'
          })
        });

        console.log(`  ✓ Initial stock added: 100 units`);
      }
    }

    console.log('\n✅ Initialization complete!');
    console.log('\nYou can now login with:');
    console.log('  Email: admin.user@vala.com');
    console.log('  Password: password123');

  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

// Run the initialization
initializeData();
