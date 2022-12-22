import { RouteInterface } from "../components/Sidebar2/routes";
import CabangPage from "./Cabang";
import DashboardPage from "./Dashboard";
import NotfoundPage from "./Notfound";

export const getPages = (data: RouteInterface) => {
  const { name } = data;
  console.log(name);
  let page = null;
  switch (name) {
    case "DASHBOARD":
      page = <DashboardPage menu={data} />;
      break;

    case "CABANG":
      page = <CabangPage menu={data} />;
      break;

    default:
      page = <NotfoundPage />;
      break;
  }
  return page;
};
