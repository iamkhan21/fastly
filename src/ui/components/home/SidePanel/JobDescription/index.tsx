import React, { FC } from "react";
import CustomerInfo from "../CustomerInfo";
import JobInfo from "../JobInfo";

interface Props {}

const JobDescription: FC<Props> = () => {
  return (
    <section className="">
      <CustomerInfo />
      <br />
      <JobInfo />
    </section>
  );
};

export default JobDescription;
