import React from "react";
import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import { RedirectToSignIn, useAuth, useUser } from "@clerk/clerk-react";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";
import DashboardLayout from "./layouts/DashboardLayout";
import PageLoader from "./components/PageLoader";

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // todo: use this to protect the route for only admin users by the admin email
  const { user } = useUser();

  if (!isLoaded) return <PageLoader />;

  return (
    <Routes>
      <Route
        path="/login"
        element={isSignedIn ? <Navigate to={"/dashboard"} /> : <LoginPage />}
      />
      <Route
        path="/"
        element={isSignedIn ? <DashboardLayout /> : <Navigate to={"/login"} />}
      >
        <Route index element={<Navigate to={"dashboard"} />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>
    </Routes>
  );
};

export default App;
