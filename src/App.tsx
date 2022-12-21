import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { PersistLogin, selectAuth } from "./slices/AuthSlice";
import { PersistConfig, selectAppConfig } from "./slices/ConfigSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { RouteInterface, routes } from "./components/Sidebar/routes";
import { useHotkeys } from "react-hotkeys-hook";
import { useAppSelector } from "./app/hooks";
import SidebarDua from "./components/Sidebar2";
import { getPages } from "./pages";
// import NotfoundPage from "./pages/Notfound";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(PersistLogin());
    dispatch(PersistConfig());
  }, [dispatch]);

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { persisting, loggedIn } = useTypedSelector(selectAuth);
  const { toastData, themeSelected } = useTypedSelector(selectAppConfig);

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
    <div data-theme={themeSelected}>
      <BrowserRouter>
        {!loggedIn ? (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
          </Routes>
        ) : (
          <MainLayout />
        )}
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

const MainLayout = (): JSX.Element => {
  const { userData } = useAppSelector(selectAuth);
  const renderRoute = useCallback(
    (route: RouteInterface) => {
      if (!userData?.accesses?.includes(route.access)) {
        return null;
      }

      if (!route.childs) {
        return (
          <Route
            key={`route-${route.title}`}
            path={route.path}
            element={getPages(route)}
          />
        );
      }

      return route.childs.map((child: any) => {
        if (child.access && !userData?.accesses?.includes(child.access)) {
          return null;
        }

        return (
          <Route
            key={`route-${child.title}`}
            path={route.path + child.path}
            element={getPages(route)}
          />
        );
      });
    },
    [userData]
  );

  const [checkedCb, setCheckedCb] = useState<boolean>(false);

  useHotkeys(
    "alt+s",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      // console.log('alt+s');
      setCheckedCb((checkedCb) => !checkedCb);
    },
    { enableOnFormTags: ["TEXTAREA", "INPUT"] }
  );

  return (
    <div className="h-screen">
      <Navbar setCheckedCb={setCheckedCb} />
      <div className="">
        <SidebarDua>
          <div className="flex flex-col flex-grow rounded-lg bg-base-300 p-4">
            <Routes>
              {routes.map(renderRoute)}
              <Route path="/login" element={<Navigate replace to="/" />} />
            </Routes>
          </div>
        </SidebarDua>
      </div>
    </div>
  );
  {
    /*           
    <h1 className="font-bold text-2xl">Dashboard</h1>
  </div> */
  }

  return (
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={checkedCb}
        onChange={(e) => setCheckedCb(e.target.checked)}
      />
      <div className="drawer-content">
        <Navbar setCheckedCb={setCheckedCb} />
        <Routes>
          {routes.map(renderRoute)}
          {/* <Route path="*" element={<NotfoundPage />} /> */}
          <Route path="/login" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
      <Sidebar isShow={checkedCb} setIsShow={setCheckedCb} />
    </div>
  );
};

export default App;
