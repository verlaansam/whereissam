import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Zorg dat je Firebase Auth importeert
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Voorkom redirect voordat auth geladen is

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // ✅ Auth-status is geladen
    });

    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {!loading && children} {/* ✅ Wacht met renderen totdat Firebase geladen is */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

