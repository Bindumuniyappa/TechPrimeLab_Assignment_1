// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

const login = async (email, password) => {
  try {
    const user = await performLogin(email, password);
    setUser(user);
    return user;
  } catch (error) {
    throw error;
  }
};

  const performLogin = async (email, password) => {
  try {
    // Make an API call to your authentication endpoint
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      // Assuming your API returns user data upon successful login
      return userData;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
};


  const logout = () => {
    // Perform logout logic here, reset user state, etc.
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
