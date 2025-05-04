
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container my-8 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
