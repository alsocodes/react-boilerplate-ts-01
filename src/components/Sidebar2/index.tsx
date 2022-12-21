import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectMenu } from "../../slices/MenuSlice";
import { routes } from "./routes";

type Props = {
  children: JSX.Element;
};

const SidebarItem = ({ active, route }: any) => {
  const { name, type, label, icon: Icon } = route;
  const isActive = active?.name === name ? "active" : "";
  if (type === "label") {
    return (
      <li className="my-px" key={name}>
        <span className="flex font-medium text-sm px-4 my-1">{label}</span>
      </li>
    );
  }
  return (
    <li className="my-px" key={name}>
      <a
        href="#"
        className={`flex flex-row items-center h-10 px-3 rounded-lg my-2 ${isActive}`}
      >
        <span className="flex items-center justify-center text-lg">
          {Icon && <Icon fontSize={24} />}
        </span>
        <span className="ml-3">{label}</span>
      </a>
    </li>
  );
};

const SidebarDua = ({ children }: Props) => {
  const { active } = useAppSelector(selectMenu);
  return (
    <div className="flex flex-row min-h-screen bg-base-100 text-base-content">
      <aside className="bg-base-100 sidebar w-64 transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in">
        <div className="sidebar-content px-4 py-2">
          <ul className="menu flex flex-col w-full">
            {routes.map((route, i) => {
              return (
                <SidebarItem active={active} key={`s-${i}`} route={route} />
              );
            })}
          </ul>
        </div>
      </aside>
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div className="main-content flex flex-col flex-grow px-4 py-2">
          {children}
        </div>
      </main>
    </div>
  );
};

export default SidebarDua;
