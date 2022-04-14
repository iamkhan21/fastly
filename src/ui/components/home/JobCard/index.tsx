import React, { FC } from "react";
import { Link } from "wouter";
import {
  getCustomerName,
  getJobLocation,
  getJobNumber,
  getTechnicianName,
  getVehicle,
  Job,
} from "@domain/job";
import { selectJob } from "@application/jobs";

interface Props {
  job: Job;
}

const JobCard: FC<Props> = ({ job }) => {
  function openJobDetails() {
    selectJob(job);
  }

  return (
    <Link href={`/home/${getJobNumber(job)}`} onClick={openJobDetails}>
      <section className="card card--primary border rounded p-2 cursor-pointer">
        <h6>{getCustomerName(job)}</h6>
        <p>{getVehicle(job)}</p>
        <p>{getJobLocation(job)}</p>
        <p>Assigned to {getTechnicianName(job)}</p>
      </section>
    </Link>
  );
};

export default React.memo(JobCard);
