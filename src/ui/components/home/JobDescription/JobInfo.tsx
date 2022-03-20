import React from "react";
import { useStore } from "effector-react";
import { $selectedJob } from "@application/jobs";
import InfoLoader from "@ui/components/home/JobDescription/InfoLoader";
import { getJobStatus, getJobTypeId, getTechnicianName } from "@domain/job";

const JobInfo = () => {
  const job = useStore($selectedJob);

  return (
    <section>
      <h4 className="mb-1">Job</h4>
      <section className="border rounded p-2">
        <section className={"flex items-center space-x-3 mb-2"}>
          {/*<img className={`text-xl icon ${getJobTypeIcon(job)} mr-2`} />*/}
          <h5 className="">
            <InfoLoader loadData={() => getJobTypeId(job)} />
          </h5>
          <span className={"bg-gray-700 rounded px-2 py-0"}>
            {getJobStatus(job)}
          </span>
        </section>

        <section>
          <figure>
            <i className="icon i-mdi-badge-account-outline" />
          </figure>
          <p>{getTechnicianName(job)}</p>
        </section>
      </section>
    </section>
  );
};

export default JobInfo;
