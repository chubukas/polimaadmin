import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { routes } from "./routes";
import { DashboardHeader } from "../components/dashboardHeader";
import { DashboardLayout } from "../components/DashboardLayout";
import { selectIsAuthenticated } from "../features/slices/authSlice";

export const AllRoutes = () => {
  const auth = useSelector(selectIsAuthenticated);

  const routeComponents = routes.map(
    ({ path, component: Component, privateRoute, exact, ...rest }, key) => {
      // return privateRoute ? (
      //   <Route
      //     exact={exact}
      //     key={key}
      //     path={path}
      //     render={(props) =>
      //       auth === false ? (
      //         <>
      //           <DashboardHeader />
      //           <DashboardLayout>
      //             <Component {...props} {...rest} />
      //           </DashboardLayout>
      //         </>
      //       ) : (
      //         <Redirect
      //           to={{ pathname: "/", state: { from: props.location } }}
      //         />
      //       )
      //     }
      //   />
      // ) : (
      //   <Route
      //     exact={exact}
      //     key={key}
      //     path={path}
      //     render={(props) => <Component {...props} {...rest} />}
      //   />
      // );

      return (
        <Route
          exact={exact}
          key={key}
          path={path}
          render={(props) =>
            auth === false ? (
              <>
                <DashboardHeader />
                <DashboardLayout>
                  <Component {...props} {...rest} />
                </DashboardLayout>
              </>
            ) : (
              <Redirect
                to={{ pathname: "/", state: { from: props.location } }}
              />
            )
          }
        />
      );
    }
  );

  return (
    <>
      <Switch>{routeComponents}</Switch>
    </>
  );
};
