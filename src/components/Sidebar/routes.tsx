import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import DashboardPage from "../../pages/Dashboard";

export interface RouteInterface {
  name: string;
  title: string;
  type?: string;
  label?: string;
  element?: any;
  access: string;
  path: string;
  icon: IconType;
  childs?: RouteInterface[];
}

export const routes: RouteInterface[] = [
  {
    name: "DASHBOARD",
    title: "Dashboard",
    access: "BASEAPP_DASHBOARD_VIEW",
    path: "/",
    icon: IoHomeOutline,
  },
];
