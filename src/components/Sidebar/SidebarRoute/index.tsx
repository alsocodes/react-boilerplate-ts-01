import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { RouteInterface } from "../routes";
import SidebarGroup from "../SidebarGroup";
import SidebarItem from "../SidebarItem";

type Props = {
  accesses: string[];
  route: RouteInterface;
  setTogleMenu?(boolean: boolean): void;
  collapse: string;
  setCollapse(string: string): void;
  selected?: string;
  showSidebar(boolean: boolean): void;
};
const SidebarRoute: FC<Props> = ({
  accesses,
  route,
  setTogleMenu,
  collapse,
  setCollapse,
  selected,
  showSidebar,
}): JSX.Element | null => {
  const { pathname } = useLocation();

  if (route.name === "label") {
    return (
      <li className="menu-title mt-2">
        <span>{route.title}</span>
      </li>
    );
  }

  if (!accesses?.includes(route.access)) {
    return null;
  }

  if (!route.childs) {
    return (
      <SidebarItem
        name={route.name}
        title={route.title}
        icon={route.icon}
        url={route.path}
        current={pathname === route.path}
        selected={selected}
        onClick={() => {
          // setTogleMenu(false);
          showSidebar(false);
          setCollapse(route.title);
        }}
      />
    );
  }

  const isCollapsed = collapse === route.title;
  const isActive = isCollapsed || pathname.startsWith(route.path);

  return (
    <SidebarGroup
      name={route.name}
      title={route.title}
      icon={route.icon}
      // setTogleMenu={setTogleMenu}
      active={isActive}
      isCollapsed={isCollapsed}
      setCollapse={setCollapse}
    >
      {route.childs.map((item, idx) => {
        if (item.access && !accesses?.includes(item.access)) {
          return <></>;
        }

        return (
          <SidebarItem
            name={route.name}
            key={`route-${route.title}-${idx}`}
            title={item.title}
            url={route.path + item.path}
            active={isActive}
            selected={selected}
            current={pathname === route.path + item.path}
          />
        );
      })}
    </SidebarGroup>
  );
};

export default SidebarRoute;
