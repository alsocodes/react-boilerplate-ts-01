import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { RouteInterface } from "../../components/Sidebar2/routes";
import { SetMenuActive } from "../../slices/MenuSlice";

type Props = {
  menu: RouteInterface;
};
const CabangPage = ({ menu }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const { icon, ...payload } = menu;
    dispatch(SetMenuActive(payload));
  }, [menu, dispatch]);
  return <div>CabangPage</div>;
};

export default CabangPage;
