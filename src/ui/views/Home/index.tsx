import React from "react";
import SidePanel from "@ui/components/home/SidePanel";
import BackgroundMap from "@ui/components/home/BackgroundMap";
import JobList from "@ui/components/home/JobList";

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
