const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    };
  }

  async request(endpoint, method = 'GET', data = null) {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
      method,
      headers: this.getHeaders(),
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'API Error');
      }

      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', 'POST', { email, password });
  }

  async register(name, email, password) {
    return this.request('/auth/register', 'POST', { name, email, password });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  // Admin endpoints
  async createAdmin(adminData) {
    return this.request('/admin/create-admin', 'POST', adminData);
  }

  async getAllUsers() {
    return this.request('/admin/users');
  }

  async getUserById(id) {
    return this.request(`/admin/users/${id}`);
  }

  async updateUser(id, userData) {
    return this.request(`/admin/users/${id}`, 'PUT', userData);
  }

  async deleteUser(id) {
    return this.request(`/admin/users/${id}`, 'DELETE');
  }

  // Product endpoints
  async createProduct(productData) {
    return this.request('/products', 'POST', productData);
  }

  async getAllProducts() {
    return this.request('/products');
  }

  async getProductById(id) {
    return this.request(`/products/${id}`);
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, 'PUT', productData);
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, 'DELETE');
  }

  // Inventory endpoints
  async recordTransaction(transactionData) {
    return this.request('/inventory', 'POST', transactionData);
  }

  async getAllTransactions() {
    return this.request('/inventory');
  }

  async getProductTransactions(productId) {
    return this.request(`/inventory/product/${productId}`);
  }

  async getInventoryReport() {
    return this.request('/inventory/report');
  }
}

const apiService = new ApiService();
