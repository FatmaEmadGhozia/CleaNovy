// src/services/authService.ts
const BASE_URL = "http://localhost:3000/api/v1";

export interface AuthResponse {
  status: string;
  data: {
    user: {
      _id: string;
      fullName: string;
      email: string;
      phone: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export const authService = {
  // Login
  async login(identifier: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    const data = await res.json();
    if (data.status !== "success") throw new Error(data.message);
    // save tokens
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    return data;
  },

  // Register
  async register(fullName: string, phone: string, email: string, password: string, role: "client" | "laundry_owner" = "client"): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, phone, email, password, role }),
    });
    const data = await res.json();
    if (data.status !== "success") throw new Error(data.message);
    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    return data;
  },

  // Logout
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  // Get current user from storage
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Check if logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem("accessToken");
  },

  // Check if provider
  isProvider(): boolean {
    const user = this.getCurrentUser();
    return user?.role === "laundry_owner" || user?.role === "provider";
  },
};