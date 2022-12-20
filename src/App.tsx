import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { PersistLogin, selectAuth } from "./slices/AuthSlice";
import DashboardPage from "./pages/Dashboard";
import { selectAppConfig } from "./slices/ConfigSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(PersistLogin());
  }, [dispatch]);

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { persisting, loggedIn } = useTypedSelector(selectAuth);
  const { toastData } = useTypedSelector(selectAppConfig);

  // toast-toastan
  useEffect(() => {
    if (!toastData) return;

    const { type, message } = toastData;

    switch (type) {
      case "error":
        toast.error(message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;

      case "success":
        toast.success(message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;

      default:
        toast(message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
    }
    // dispatch(setToastData(null));
  }, [toastData, dispatch]);

  if (persisting) {
    return null;
  }

  return (
    <BrowserRouter>
      {!loggedIn ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      ) : (
        <MainLayout />
      )}
      <ToastContainer />
    </BrowserRouter>
  );
};

const MainLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default App;
