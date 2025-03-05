import jwtDecode from 'jwt-decode'

// Decode JWT token
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

// Check if token is valid (not expired)
export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    // Check if token has expiration and is not expired
    return decoded.exp ? decoded.exp > currentTime : true;
  } catch (error) {
    return false;
  }
}

// Get user data from token
export const getUserFromToken = (token) => {
  if (!token) return null;
  
  try {
    const decoded = jwtDecode(token);
    
    return {
      id: decoded.id || decoded.userId || decoded.sub,
      email: decoded.email,
      fullName: decoded.fullName || decoded.name,
      role: decoded.role || decoded.userType,
      // Add any other fields from your token
    };
  } catch (error) {
    return null;
  }
}

// Store authentication data
export const storeAuthData = (token) => {
  localStorage.setItem('auth_token', token);
  
  const userData = getUserFromToken(token);
  if (userData) {
    localStorage.setItem('user_info', JSON.stringify(userData));
  }
  
  return userData;
}

// Clear authentication data (for logout)
export const clearAuthData = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_info');
}

// Get stored user data
export const getStoredUserData = () => {
  const userJson = localStorage.getItem('user_info');
  return userJson ? JSON.parse(userJson) : null;
}

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token');
  return isTokenValid(token);
}