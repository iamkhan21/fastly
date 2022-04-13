import React from "react";
import SidePanel from "@components/home/SidePanel";
import BackgroundMap from "@components/home/BackgroundMap";
import JobList from "@components/home/JobList";

const Home = () => {
  return (
    <article className="relative flex justify-between h-full">
      <BackgroundMap />
      <JobList />
      <SidePanel />
    </article>
  );
};

export default Home;
