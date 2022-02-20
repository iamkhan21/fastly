import React from "react";
import { Route, Switch } from "wouter";

const Home = React.lazy(() => import("@ui/views/Home"));

const Main = () => {
  return (
    <main data-testid="main">
      <React.Suspense fallback={<p>Loading..</p>}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/home/:uid" component={Home} />
          <Route path="/about">About Us</Route>
          <Route path="/users/:name">
            {(params) => <div>Hello, {params.name}!</div>}
          </Route>
        </Switch>
      </React.Suspense>
    </main>
  );
};

export default Main;
