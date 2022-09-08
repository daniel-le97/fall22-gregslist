import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";
import { setHTML } from "../Utils/Writer.js";

function drawJobs() {
  let template = "";
  appState.jobs.forEach((job) => (template += job.JobListingTemplate));

  setHTML("listings", template);
//   // _drawJobsForm();
}
// function _drawJobsForm() {
  
//   setHTML("formDiv", appState.jobs);
// }

export class JobsController {
  constructor() {
    console.log("the jobs controller");
  }

  showJobs() {
    drawJobs();
  }

  addJobs() {}
}
