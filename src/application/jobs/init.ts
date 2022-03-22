import {
  $jobs,
  $selectedJob,
  loadActiveJobs,
  loadActiveJobsFx,
  loadJobDetails,
  loadJobDetailsFx,
  resetJob,
  selectJob,
} from "@application/jobs/index";
import { forward } from "effector";
import jobs from "@constants/full-jobs.json";
import { FullJob, Job } from "@domain/job";
import { storageAdapter } from "@services/storageAdapter";
import { TokenType } from "@services/types";
import { jobsAdapter } from "@services/jobsAdapter";
import { of } from "await-of";

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

loadActiveJobsFx.use(async () => {
  const token = await storageAdapter().getToken(TokenType.auth_token);

  if (!token) throw "Token missed";

  const [data, err] = await of(jobsAdapter().getActiveJobs(token));

  await new Promise((resolve) => {
    setTimeout(resolve, 1_000);
  });

  if (err || !data) {
    throw "Can't load jobs";
  }
  return data;
});

forward({
  from: loadActiveJobs,
  to: loadActiveJobsFx,
});

const newJobSelected = selectJob.filter({
  fn: (job) =>
    ($selectedJob.getState() as Job)?.service?.number !== job?.service?.number,
});

$jobs.on([loadActiveJobsFx.doneData], (_, jobs) => jobs);

$selectedJob
  .reset(resetJob)
  .on([newJobSelected, loadJobDetailsFx.doneData], (_, job) => job);
