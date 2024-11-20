export function storeSession(token, userData) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  }
  
  export function getSession() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    return { token, user };
  }
  
  export function clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  