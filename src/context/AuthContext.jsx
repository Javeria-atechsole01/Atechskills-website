import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

/**
 * TEMP MOCK AUTH SYSTEM
 * Used for UI testing without backend API.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [user, token]);

  const login = async (email, password) => {
    // TEMP MOCK AUTH LOGIC (for testing without backend)
    if (email === "test@atech.com" && password === "123456") {
      const mockUser = {
        name: "Test User",
        email: "test@atech.com",
        role: "student",
        enrollmentStatus: "enrolled",
        batch: "Batch-001",
        token: "mock-token-123"
      };
      setUser(mockUser);
      setToken(mockUser.token);
      return { success: true, user: mockUser };
    }

    // REAL BACKEND LOGIN
    try {
      const res = await fetch(`/api/sms/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setUser(data.user);
        setToken(data.token);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      return { success: false, message: "Network error: Backend server might be down or connection failed" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

