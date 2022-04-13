import React from "react";
import { Redirect, Route, Switch } from "wouter";
import ComponentLoader from "@components/shared/ComponentLoader";

const Home = React.lazy(() => import("@views/Home"));
const Users = React.lazy(() => import("@views/Fleet"));
const Finance = React.lazy(() => import("@views/Finance"));
const About = React.lazy(() => import("@views/About"));
const Organization = React.lazy(() => import("@views/Organization"));
const Jobs = React.lazy(() => import("@views/Jobs"));
const FAQs = React.lazy(() => import("@views/FAQ"));
const NotFound = React.lazy(() => import("@views/NotFound"));

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
