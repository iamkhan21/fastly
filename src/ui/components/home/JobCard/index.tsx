import React, { FC } from "react";
import { Link } from "wouter";
import {
  getCityAndState,
  getCustomerName,
  getJobNumber,
  getTechnicianName,
  getVehicleModel,
  Job,
} from "@domain/job";
import { selectJob } from "@application/jobs";

interface Props {
  job: Job;
}

const JobCard: FC<Props> = ({ job }) => {
  return (
    <Link onClick={() => selectJob(job)} href={`/home/${getJobNumber(job)}`}>
      <section className="card card--primary border rounded p-2 cursor-pointer">
        <h6>{getCustomerName(job)}</h6>
        <p>{getVehicleModel(job)}</p>
        <p>{getCityAndState(job)}</p>
        <p>Assigned to {getTechnicianName(job)}</p>
      </section>
    </Link>
  );
};

export default React.memo(JobCard);
