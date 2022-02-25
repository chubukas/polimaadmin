import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { SearchBar } from "./SearchBar";
import { HeaderBar } from "./HeaderBar";
import { SideBar } from "./SideBar";
import { isToken, TOKEN } from "../../utils/GetterSetter";
import { authSignOut } from "../../features/slices/authSlice";
import { setAuthToken } from "../../utils";
import { storageDecryptedData } from "../../utils/dataSecurity";

export const DashboardHeader = () => {
  const dispatch = useDispatch();

  const auth = isToken(TOKEN);

  useEffect(() => {
    if (!auth) dispatch(authSignOut());
    if (auth) setAuthToken(storageDecryptedData(TOKEN));
  }, [dispatch, auth]);

  return (
    <>
      <div className="hidden md:block">
        <HeaderBar />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <HeaderBar />
      </div>
      <div className="md:hidden">
        <SearchBar />
      </div>
      {/*End of Mobile View */}

      <div className="hidden md:block">
        <SideBar />
      </div>
    </>
  );
};
