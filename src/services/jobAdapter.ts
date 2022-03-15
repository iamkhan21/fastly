import { getJobTypeId, Job } from "@domain/job";
import jobTypeIcons from "@constants/job-type-icons.json";

export function getJobTypeIcon(job: Job): string | null {
  const jobId = getJobTypeId(job);
  if (!jobId) return null;
  // @ts-ignore
  return jobTypeIcons[jobId];
}
