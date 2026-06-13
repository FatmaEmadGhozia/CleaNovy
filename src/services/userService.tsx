import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper: get token from localStorage
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  completedOrders?: number;
  role: string;
}

export interface UpdateProfilePayload {
  fullName: string;
  phone: string;
  address: string;
}

// GET /api/v1/profile/me
export const fetchProfile = async (): Promise<UserProfile> => {
  const { data } = await axios.get(`${API_URL}/api/v1/profile/me`, getAuthHeaders());
  return data.data.user;
};

// PATCH /api/v1/profile/update
export const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<UserProfile> => {
  const { data } = await axios.patch(
    `${API_URL}/api/v1/profile/update`,
    payload,
    getAuthHeaders()
  );
  return data.data.user;
};

// PATCH /api/v1/profile/avatar
export const updateProfileImage = async (
  file: File
): Promise<{ avatar: string }> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await axios.patch(
    `${API_URL}/api/v1/profile/avatar`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.data;
};