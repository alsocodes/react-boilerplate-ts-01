import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { RouteInterface } from "../../components/Sidebar2/routes";
import { SetMenuActive } from "../../slices/MenuSlice";

type Props = {
  menu: RouteInterface;
};
const DashboardPage = ({ menu }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(SetMenuActive(menu));
  }, [menu, dispatch]);
  return <div>DashboardPage</div>;
};

export default DashboardPage;
