import React from "react";
import { routerRedux, router, Router as DvaRouter } from "dva";
import { ConfigProvider } from "antd";
import { getNavData } from "./menu";
const Router = routerRedux.ConnectedRouter;

const { Switch, Route } = router;

const RouteWithProps: any = ({
  path,
  exact,
  strict,
  render,
  location,
  ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    strict={strict}
    location={location}
    render={(props) => render({ ...props, ...rest })}
  />
);

function getCompatProps(props) {
  const compatProps: any = {};

  if (props.match && props.match.params && !props.params) {
    compatProps.params = props.match.params;
  }
  return compatProps;
}

export function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        const RouteRoute = RouteWithProps;
        return (
          <RouteRoute
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props) => {
              const childRoutes = renderRoutes(
                route.children,
                {},
                {
                }
              );
              if (route.component) {
                const compatProps = getCompatProps({
                  ...props,
                  ...extraProps,
                });

                const newProps = {
                  ...props,
                  ...extraProps,
                  ...compatProps,
                  args: { route },
                };
                return (
                  <route.component
                    {...newProps}
                    breadcrumbRoutes={routes}
                    route={route}
                  >
                    {childRoutes}
                  </route.component>
                );
              } else {
                return childRoutes;
              }
            }}
          />
        );
      })}
    </Switch>
  ) : null;
}

const RouterConfig: DvaRouter = (param) => {
  if (!param) {
    return <></>;
  }
  const { app, history } = param;
  const navData = getNavData(app);
  return (
    <ConfigProvider>
      <Router history={history}>{renderRoutes(navData, {})}</Router>
    </ConfigProvider>
  );
};

export default RouterConfig;
