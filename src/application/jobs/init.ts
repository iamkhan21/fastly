import {
  $selectedJob,
  loadJobDetails,
  loadJobDetailsFx,
  resetJob,
  selectJob,
} from "@application/jobs/index";
import { forward } from "effector";
import jobs from "@constants/full-jobs.json";
import { FullJob, Job } from "@domain/job";

loadJobDetailsFx.use(({ jobId, signal }): Promise<FullJob> => {
  const aborted = "Aborted";

  if (signal.aborted) {
    return Promise.reject(aborted);
  }

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      // @ts-ignore
      resolve(jobs[jobId] as FullJob);
    }, 2_000);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(aborted);
    };
  });
});

forward({
  from: loadJobDetails,
  to: loadJobDetailsFx,
});

const newJobSelected = selectJob.filter({
  fn: (job) =>
    ($selectedJob.getState() as Job)?.service?.number !== job?.service?.number,
});

$selectedJob
  .reset(resetJob)
  .on([newJobSelected, loadJobDetailsFx.doneData], (_, job) => job);
