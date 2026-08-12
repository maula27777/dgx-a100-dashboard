import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Container from "./pages/Container";
import Process from "./pages/Process";
import GPU from "./pages/GPU";
import Storage from "./pages/Storage";


function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}


function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.BASE_URL}
    >
      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />


        {/* HOME */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        {/* CONTAINER */}
        <Route
          path="/container"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Container />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        {/* PROCESS */}
        <Route
          path="/process"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Process />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        {/* GPU */}
        <Route
          path="/gpu"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <GPU />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        {/* STORAGE */}
        <Route
          path="/storage"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Storage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}


export default App;