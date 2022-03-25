import { useEffect } from "react";
import { $selectedJob, loadJobDetails, resetJob } from "@application/jobs";
import { useStore } from "effector-react";

export function useLoadJobInfo(jobUid: string = "") {
  const job = useStore($selectedJob);
  const selectedJobUid = job?.service?.number;

  useEffect(() => {
    if (selectedJobUid !== +jobUid) resetJob();
  }, [selectedJobUid, jobUid]);

  useEffect(() => {
    const abortController = new AbortController();

    if (jobUid) {
      loadJobDetails({ jobUID: +jobUid, abortController });
    }

    return () => abortController.abort();
  }, [jobUid]);
}
