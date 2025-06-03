"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { checkAdmin } from "../lib/checkAdmin";

export const AdminContext = createContext({
  isAdmin: false,
  loading: true,
});

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      const result = await checkAdmin();
      setIsAdmin(result);
      setLoading(false);
    }
    verify();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
