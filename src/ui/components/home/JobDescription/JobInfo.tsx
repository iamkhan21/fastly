import React, { FC, ReactElement } from "react";
import { useStore } from "effector-react";
import { $selectedJob } from "@application/jobs";
import InfoLoader from "@ui/components/home/JobDescription/InfoLoader";
import {
  getJobETA,
  getJobLocation,
  getJobOffer,
  getJobStatus,
  getJobTypeId,
  getTechnicianNameAndPhone,
} from "@domain/job";

type Props = {
  icon: string;
  title: string;
  data: ReactElement<any, any>;
};

const InfoSection: FC<Props> = React.memo(({ icon, title, data }) => (
  <section className="flex space-x-2 mb-2">
    <figure className={""}>
      <i className={`icon ${icon} text-3xl`} />
    </figure>
    <div>
      <p>
        <b>{title}</b>
      </p>
      <p>{data}</p>
    </div>
  </section>
));

const JobInfo = () => {
  const job = useStore($selectedJob);

  return (
    <section>
      <h4 className="mb-1">Job</h4>
      <section className="border rounded py-2 px-3">
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
          <InfoSection
            icon={"i-mdi-cash"}
            title={"Job offer amount"}
            data={<InfoLoader loadData={() => getJobOffer(job)} />}
          />
          <InfoSection
            icon={"i-mdi-badge-account-outline"}
            title={"Driver"}
            data={
              <InfoLoader loadData={() => getTechnicianNameAndPhone(job)} />
            }
          />
          <InfoSection
            icon={"i-mdi-map-marker-outline"}
            title={"Pick-up location"}
            data={<InfoLoader loadData={() => getJobLocation(job)} />}
          />
          <InfoSection
            icon={"i-mdi-timer-outline"}
            title={"ETA"}
            data={<InfoLoader loadData={() => getJobETA(job)} />}
          />
        </section>
      </section>
    </section>
  );
};

export default JobInfo;
