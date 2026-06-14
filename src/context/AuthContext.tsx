import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  // isLoading: true حتى ما نتأكد من الـ token في localStorage
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // عند أي refresh، اقرأ من localStorage مباشرة
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("user");

    if (token && stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch {
        // لو البيانات corrupt، امسحها
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setUser(null);
      }
    } else {
      // لو مفيش token، امسح كل حاجة
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setUser(null);
    }

    setIsLoading(false);
  }, []);

  const login = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  // مش هنعرض أي حاجة حتى ما نتأكد من الـ auth state
  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);