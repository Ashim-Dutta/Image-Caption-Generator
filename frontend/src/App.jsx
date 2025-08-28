import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";



const Header = lazy(()=>import('./components/Header'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Footer = lazy(() => import("./components/Footer"));
const NotFoundPage = lazy(() => import('./Pages/NotFoundPage'))
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));


export default function App() {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}
