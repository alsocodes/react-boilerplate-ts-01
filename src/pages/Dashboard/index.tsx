import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { RouteInterface } from "../../components/Sidebar/routes";
import { SetMenuActive } from "../../slices/MenuSlice";

interface Props {
  menu: RouteInterface;
}
const DashboardPage = ({ menu }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const { icon, ...payload } = menu;
    dispatch(SetMenuActive(payload));
  }, [menu, dispatch]);
  useEffect(() => {
    console.log("xxx");
  }, []);
  return (
    <div>
      <h1 className="font-bold text-2xl">Dashboard</h1>
      DashboardPage
    </div>
  );
};

export default DashboardPage;
