import React from "react";
import { useStore } from "effector-react";
import { $selectedJob } from "@application/jobs";
import InfoLoader from "@components/home/SidePanel/InfoLoader";
import {
  convertJobStatusToHR,
  convertJobTypeToHR,
  getJobETA,
  getJobETAToHR,
  getJobLocation,
  getJobOffer,
  getJobStatus,
  getJobType,
  getTechnicianName,
  getTechnicianPhone,
} from "@domain/job";
import InfoSection from "@components/home/SidePanel/InfoSection";
import { formatPhoneNumberToHR } from "@lib/utils/formatters/phone-formatter";

const JobInfo = () => {
  const job = useStore($selectedJob);

  return (
    <section>
      <h4 className="mb-1">Job</h4>
      <section className="border rounded py-2 px-3">
        <section className="flex items-center space-x-3 mb-2">
          <h5>
            <InfoLoader loadData={() => convertJobTypeToHR(getJobType(job))} />
          </h5>
          <span className="bg-gray-700 text-white rounded px-2 py-0">
            {convertJobStatusToHR(getJobStatus(job))}
          </span>
        </section>
        <br />
        <section className="space-y-2">
          <InfoSection
            icon="i-mdi-cash"
            content={
              <section className="min-h-55px">
                <h6 className="mb-0.5">Job offer amount</h6>
                <p>
                  <InfoLoader loadData={() => getJobOffer(job)} />
                </p>
              </section>
            }
          />
          <InfoSection
            icon="i-mdi-badge-account-outline"
            content={
              <section className="min-h-55px">
                <h6 className="mb-0.5">Driver</h6>
                <p className="flex space-x-2">
                  <span>
                    <InfoLoader loadData={() => getTechnicianName(job)} />
                  </span>
                  <span>
                    <InfoLoader
                      loadData={() =>
                        formatPhoneNumberToHR(getTechnicianPhone(job))
                      }
                    />
                  </span>
                </p>
              </section>
            }
          />
          <InfoSection
            icon="i-mdi-map-marker-outline"
            content={
              <section className="min-h-55px">
                <h6 className="mb-0.5">Pick-up location</h6>
                <p>
                  <InfoLoader loadData={() => getJobLocation(job)} />
                </p>
              </section>
            }
          />
          <InfoSection
            icon="i-mdi-timer-outline"
            content={
              <section className="min-h-55px">
                <h6 className="mb-0.5">ETA</h6>
                <p>
                  <InfoLoader loadData={() => getJobETAToHR(getJobETA(job))} />
                </p>
              </section>
            }
          />
        </section>
      </section>
    </section>
  );
};

export default JobInfo;
