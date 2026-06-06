import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper: get token from localStorage
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  completedOrders: number;
  role: string;
}

export interface UpdateProfilePayload {
  name: string;
  phone: string;
  address: string;
}

// GET /api/users/profile
export const fetchProfile = async (): Promise<UserProfile> => {
  const { data } = await axios.get(`${API_URL}/users/profile`, getAuthHeaders());
  return data.data;
};

// PUT /api/users/profile
export const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<UserProfile> => {
  const { data } = await axios.put(
    `${API_URL}/users/profile`,
    payload,
    getAuthHeaders()
  );
  return data.data;
};
// PUT /api/users/profile/image
export const updateProfileImage = async (
  file: File
): Promise<{ profileImage: string }> => {
  const formData = new FormData();
  formData.append("profileImage", file);

  const { data } = await axios.put(
    `${API_URL}/users/profile/image`,
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