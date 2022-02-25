import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import { sideBarIcons, downIcons } from "../../data/sideBarIcons";
import { classNames } from "../../utils";
import { authSignOut, selectUser } from "../../features/slices/authSlice";
import Avatar from "../Avatar";

export const SideBar = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const paths = pathname.split("/");

  const logout = (name) => {
    if (name === "Logout") {
      dispatch(authSignOut());
    }
  };

  const sideBars = sideBarIcons.map(({ link, name, icons }, i) => (
    <li
      key={i}
      className="mb-4"
      aria-current={paths.includes(name) ? "page" : undefined}
    >
      <Link
        to={link}
        className={classNames(
          paths.includes(name) ? "bg-blue-400" : "",
          "flex items-center p-2 space-x-3 rounded-md"
        )}
      >
        <FontAwesomeIcon icon={icons} className="w-5 h-5 text-gray-50" />
        <span>{name}</span>
      </Link>
    </li>
  ));

  const downSideBars = downIcons.map(({ link, name, icons }, i) => (
    <li key={i} aria-current={paths.includes(name) ? "page" : undefined}>
      <Link
        to={link}
        className={classNames(
          paths.includes(name) ? "bg-blue-400" : "",
          "flex items-center p-2 space-x-3 rounded-md"
        )}
        onClick={() => logout(name)}
      >
        <FontAwesomeIcon icon={icons} className="w-5 h-5 text-gray-50" />
        <span>{name}</span>
      </Link>
    </li>
  ));

  return (
    <div className="p-3 h-auto space-y-2 w-6/12 sm:w-2/6 md:w-3/12 xl:w-2/12 sidebar-bg lg:main-bg text-gray-50 absolute rounded-b z-auto">
      <div className="flex items-center p-2 space-x-4">
        <Avatar show />
        <div>
          <h2 className="text-sm font-semibold">{`${user?.firstName ?? ""} ${
            user?.lastName ?? ""
          }`}</h2>
          <span className="flex items-center space-x-1 mt-2">
            <Link to="/Profile" className="text-xs hover:underline">
              View profile
            </Link>
          </span>
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        <ul className="pt-2 pb-4 space-y-1 text-sm">{sideBars}</ul>
        <ul className="pt-4 pb-2 space-y-1 text-xs">{downSideBars}</ul>
      </div>
    </div>
  );
};
