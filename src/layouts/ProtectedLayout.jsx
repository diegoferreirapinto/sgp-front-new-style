
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Import FormProvider from react-hook-form
import { FormProvider, useForm } from "react-hook-form";

const ProtectedLayout = () => {
  const { user } = useAuth();
  // Create a dummy form methods object to provide context
  const formMethods = useForm();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* Wrap the entire content in a FormProvider */}
      <FormProvider {...formMethods}>
        <main className="container my-8 flex-1">
          <Outlet />
        </main>
      </FormProvider>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
