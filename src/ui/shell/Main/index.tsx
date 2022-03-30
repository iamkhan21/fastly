import React from "react";
import { Redirect, Route, Switch } from "wouter";
import ComponentLoader from "@ui/components/shared/ComponentLoader";

const Home = React.lazy(() => import("@ui/views/Home"));
const Users = React.lazy(() => import("@ui/views/Fleet"));
const Finance = React.lazy(() => import("@ui/views/Finance"));
const About = React.lazy(() => import("@ui/views/About"));
const Organization = React.lazy(() => import("@ui/views/Organization"));
const Jobs = React.lazy(() => import("@ui/views/Jobs"));
const FAQs = React.lazy(() => import("@ui/views/FAQ"));
const NotFound = React.lazy(() => import("@ui/views/NotFound"));

const Main = () => {
  return (
    <main data-testid="main">
      <React.Suspense fallback={<ComponentLoader />}>
        <Switch>
          <Route path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home/:uid*" component={Home} />
          <Route path="/fleet" component={Users} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/finance" component={Finance} />
          <Route path="/about" component={About} />
          <Route path="/faqs" component={FAQs} />
          <Route path="/organization" component={Organization} />
          <Route component={NotFound} />
        </Switch>
      </React.Suspense>
    </main>
  );
};

export default Main;
