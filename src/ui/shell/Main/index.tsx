import React from "react";
import { Redirect, Route, Switch } from "wouter";

const Home = React.lazy(() => import("@ui/views/Home"));
const Users = React.lazy(() => import("@ui/views/Users"));
const Finance = React.lazy(() => import("@ui/views/Finance"));
const NotFound = React.lazy(() => import("@ui/views/NotFound"));

const Main = () => {
  return (
    <main data-testid="main">
      <React.Suspense fallback={<p>Loading..</p>}>
        <Switch>
          <Route path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/home/:uid" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/finance" component={Finance} />
          <Route component={NotFound} />
        </Switch>
      </React.Suspense>
    </main>
  );
};

export default Main;
