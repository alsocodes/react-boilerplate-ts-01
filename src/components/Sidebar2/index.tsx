import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAppConfig } from "../../slices/ConfigSlice";
import { selectMenu } from "../../slices/MenuSlice";
import { routes } from "./routes";

type Props = {
  children: JSX.Element;
};

const SidebarItem = ({ active, route, hideLabel }: any) => {
  const { name, type, label, icon: Icon, path } = route;
  const isActive = active?.name === name ? "active" : "";

  if (type === "label") {
    return (
      <li className="my-px" key={name}>
        <span className={`flex font-medium text-sm px-4 my-1 rounded-lg`}>
          {hideLabel ? "..." : label}
        </span>
      </li>
    );
  }
  return (
    <li className="my-px" key={name}>
      <Link
        to={path}
        className={`flex flex-row items-center h-10 px-3 rounded-lg my-2 ${isActive}`}
      >
        <span className="flex items-center justify-center text-lg">
          {Icon && <Icon fontSize={24} />}
        </span>
        <span className={`ml-3 ${hideLabel && "hidden"}`}>{label}</span>
      </Link>
    </li>
  );
};

const SidebarDua = ({ children }: Props) => {
  const { active } = useAppSelector(selectMenu);
  const { hideSidebar } = useAppSelector(selectAppConfig);

  const [hide, setHide] = useState(hideSidebar);
  useEffect(() => {
    setHide(hideSidebar);
  }, [hideSidebar]);

  const onMouseHover = (val: boolean) => {
    if (!hideSidebar) return;
    setHide(val);
  };

  return (
    // flex-row
    <div className="flex min-h-screen bg-base-100 text-base-content">
      <aside
        onMouseOver={() => onMouseHover(false)}
        onMouseOut={() => onMouseHover(true)}
        className={`${
          hide ? "w-0 md:w-20" : "w-44 md:w-52"
        } bg-base-100 sidebar transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <div className="sidebar-content px-4 py-2">
          <ul className="menu flex flex-col w-full">
            {routes.map((route, i) => {
              return (
                <SidebarItem
                  hideLabel={hide}
                  active={active}
                  key={`s-${i}`}
                  route={route}
                />
              );
            })}
          </ul>
        </div>
      </aside>
      {/* flexx flex-colx */}
      <main className="main flex-grow transition-all duration-150 ease-in">
        <div className="main-content flex flex-col flex-grow px-4 py-2">
          {children}
        </div>
      </main>
    </div>
  );
};

export default SidebarDua;
