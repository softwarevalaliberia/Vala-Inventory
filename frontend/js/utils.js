class UIManager {
  static showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
      <span>${message}</span>
      <span class="alert-close" onclick="this.parentElement.style.display='none';">&times;</span>
    `;

    const container = document.querySelector('.container') || document.querySelector('.main-content');
    if (container) {
      container.insertBefore(alertDiv, container.firstChild);
      setTimeout(() => alertDiv.remove(), 5000);
    }
  }

  static showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
    }
  }

  static hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
    }
  }

  static showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '<p style="text-align: center; padding: 2rem;">Loading...</p>';
    }
  }

  static clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
      form.reset();
    }
  }

  static getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return null;

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    return data;
  }

  static createTable(data, columns) {
    if (!data || data.length === 0) {
      return '<p style="text-align: center; padding: 2rem;">No data available</p>';
    }

    let html = '<table><thead><tr>';

    columns.forEach((col) => {
      html += `<th>${col.label}</th>`;
    });

    html += '</tr></thead><tbody>';

    data.forEach((row) => {
      html += '<tr>';
      columns.forEach((col) => {
        const value = this.getNestedProperty(row, col.key);
        html += `<td>${value || '-'}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
  }

  static getNestedProperty(obj, path) {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  static formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  static formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}

class AuthManager {
  static isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  static getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  static setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  }

  static getUserRole() {
    const user = this.getUser();
    return user?.role || 'staff';
  }

  static isSuperAdmin() {
    return this.getUserRole() === 'superadmin';
  }

  static isAdmin() {
    return this.getUserRole() === 'admin';
  }

  static canManageUsers() {
    return this.isSuperAdmin() || this.isAdmin();
  }
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
  if (!AuthManager.isLoggedIn() && !window.location.pathname.includes('login')) {
    window.location.href = 'login.html';
  }
});
