import {
  IoHomeOutline,
  IoGitBranch,
  IoPeople,
  IoAppsSharp,
} from "react-icons/io5";
import { IconType } from "react-icons";

export interface RouteInterface {
  name: string;
  title?: string;
  type?: string;
  label?: string;
  element?: any;
  access: string;
  path: string;
  icon?: IconType;
  childs?: RouteInterface[];
}

export const routes: RouteInterface[] = [
  {
    name: "DASHBOARD",
    title: "Dashboard",
    label: "Dashboard",
    access: "BASEAPP_DASHBOARD_VIEW",
    path: "/",
    icon: IoHomeOutline,
  },
  {
    name: "MASTER",
    label: "Master",
    access: "",
    path: "/",
    type: "label",
  },
  {
    name: "CABANG",
    title: "CABANG",
    label: "Cabang",
    access: "BASEAPP_CABANG_VIEW",
    path: "/",
    icon: IoGitBranch,
  },
  {
    name: "PROGRAM",
    title: "PROGRAM",
    label: "Program",
    access: "BASEAPP_PROGRAM_VIEW",
    path: "/",
    icon: IoAppsSharp,
  },
  {
    name: "PEGAWAI",
    title: "PEGAWAI",
    label: "Pegawai",
    access: "BASEAPP_PEGAWAI_VIEW",
    path: "/",
    icon: IoPeople,
  },
];
