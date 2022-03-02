import {
  $selectedJob,
  loadJobDetails,
  loadJobDetailsFx,
  resetJob,
  selectJob,
} from "@application/jobs/index";
import { forward } from "effector";
import job from "./job.json";
import { FullJob } from "@domain/job";

loadJobDetailsFx.use((jobId): Promise<FullJob> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(job as FullJob), 5_000);
  });
});

forward({
  from: loadJobDetails,
  to: loadJobDetailsFx,
});

$selectedJob
  .reset(resetJob)
  .on([selectJob, loadJobDetailsFx.doneData], (_, job) => job);
