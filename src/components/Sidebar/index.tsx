import React, {
  FC,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import useKeyPress from "./useKeypress";
import { RouteInterface, routes } from "./routes";
// import SidebarItem from "./SidebarItem";
import SidebarRoute from "./SidebarRoute";
// import { accesses } from "../../mock-data/list-access";
import { useNavigate } from "react-router-dom";

type Props = {
  isShow: boolean;
  setIsShow(bool: boolean): void;
};
const accesses = ["BASEAPP_DASHBOARD_VIEW"];
const initialState = { selectedIndex: -1 };
const Sidebar: FC<Props> = ({ isShow, setIsShow }): JSX.Element => {
  const bListMenu: RouteInterface[] = useMemo(() => [...routes], []);
  const [listMenu, setListMenu] = useState([...bListMenu]);
  const navigate = useNavigate();

  const reducer = (state: any, action: any) => {
    // console.log('isLabel', isLabel, action.type);
    switch (action.type) {
      case "arrowUp":
        return {
          selectedIndex:
            state.selectedIndex > 0
              ? state.selectedIndex -
                (listMenu[state.selectedIndex - 1]?.name === "label" ? 2 : 1)
              : listMenu.length - 1,
        };
      case "arrowDown":
        return {
          selectedIndex:
            state.selectedIndex < listMenu.length - 1
              ? state.selectedIndex +
                (listMenu[state.selectedIndex + 1]?.name === "label" ? 2 : 1)
              : 0,
        };
      case "select":
        return { selectedIndex: action.payload };
      default:
        throw new Error();
    }
  };

  const SidebarArea = useRef(null);
  const SearchInput = useRef<HTMLInputElement>(null);
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const escapePressed = useKeyPress("Escape");
  const enterPressed = useKeyPress("Enter");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (arrowUpPressed && isShow) {
      dispatch({ type: "arrowUp" });
    }
  }, [arrowUpPressed, isShow]);

  useEffect(() => {
    if (arrowDownPressed && isShow) {
      dispatch({ type: "arrowDown" });
    }
  }, [arrowDownPressed, isShow]);

  useEffect(() => {
    if (escapePressed && isShow) {
      setIsShow(false);
    }
  }, [escapePressed, isShow, setIsShow]);

  useEffect(() => {
    if (enterPressed && isShow) {
      // console.log('enter');
      const route: RouteInterface = listMenu[state.selectedIndex];
      navigate(route.path, { replace: true });
      setIsShow(false);
    }
  }, [enterPressed, isShow, listMenu, navigate, setIsShow, state]);

  useEffect(() => {
    if (isShow) {
      if (null !== SearchInput.current) SearchInput.current.focus();
      setInputValue("");
    }
  }, [isShow]);

  useEffect(() => {
    // console.log(state);
  }, [state]);

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log(inputValue, bListMenu);
      if (inputValue === "") setListMenu([...bListMenu]);
      else
        setListMenu(
          bListMenu.filter((item) =>
            item.title.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
    }, 200);

    return () => clearTimeout(timer);
  }, [inputValue, bListMenu]);

  const [collapse, setCollapse] = useState("");

  const onCollapse = (menu: string) => {
    setCollapse(collapse === menu ? "" : menu);
  };

  return (
    <div className="drawer-side" ref={SidebarArea}>
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <div className="menu p-4 overflow-y-hidden h-screen w-80 bg-base-100 text-base-content">
        <div className="form-control">
          <input
            ref={SearchInput}
            autoFocus
            type="text"
            placeholder="Pencarian ..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input w-full max-w-xs input-sm"
          />
        </div>
        <hr className="mb-4 mt-4" />

        {listMenu.map((item: RouteInterface, i: number): JSX.Element => {
          return (
            <SidebarRoute
              key={`route-${i}`}
              route={item}
              accesses={accesses}
              collapse={collapse}
              selected={listMenu[state.selectedIndex]?.name}
              setCollapse={onCollapse}
              showSidebar={setIsShow}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
