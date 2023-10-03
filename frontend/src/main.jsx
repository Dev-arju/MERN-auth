import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import Admin from "./Admin.jsx";
import AdminAccess from "./components/adminComponents/AdminAccess.jsx";
import AdminLoginScreen from "./screens/adminScreens/AdminLoginScreen.jsx";
import AdminHome from "./screens/adminScreens/AdminHome.jsx";
import UserUpdate from "./screens/adminScreens/UserUpdate.jsx";
import CreateUser from "./screens/adminScreens/CreateUser.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<HomeScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<Admin />}>
        {/* admin private routes */}
        <Route element={<AdminAccess />}>
          <Route index element={<AdminHome />} />
          <Route path="/admin/update/:id" element={<UserUpdate />} />
          <Route path="/admin/add-user" element={<CreateUser />} />
        </Route>

        <Route path="login" element={<AdminLoginScreen />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
