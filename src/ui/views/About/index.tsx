import React from "react";
import pkg from "../../../../package.json";

const About = () => {
  return (
    <article className="content">
      <h6>App version: {pkg.version}</h6>
    </article>
  );
};

export default About;
