import {cancelJob, Job, JobCallback, scheduleJob} from 'node-schedule';

class JobScheduler {
  jobs: Job[] = [];

  schedule(rule: string, callback: JobCallback) {
    const job = scheduleJob(rule, callback);

    this.jobs.push(job);
  }

  destroyJobs() {
    this.jobs.forEach(job => cancelJob(job));
    this.jobs = [];
  }
}

export default JobScheduler;
