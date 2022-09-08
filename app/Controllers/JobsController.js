import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";
import { jobsService } from "../Services/JobsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { setHTML } from "../Utils/Writer.js";

function drawJobs() {
  let template = "";
  appState.jobs.forEach((job) => (template += job.JobListingTemplate));

  setHTML("listings", template);
  _drawJobsForm();
}
function _drawJobsForm() {
  let template = "";
  template += `
  
  <form onsubmit="app.jobsController.addJob()">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="job" required minlength="3" maxlength="20">
          <label for="job">Job</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="company" required>
          <label for="company">Company</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="hours" required min="1886" max="9999">
          <label for="hours">Hours</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="salary" required min="0">
          <label for="salary">Salary</label>
        </div>

        <div class="form-floating mb-3">
          <input type="url" class="form-control" name="imgUrl">
          <label for="imgUrl">Image Url <i>(We are too lazy for uploads)</i></label>
        </div>

        <div class="form-floating">
          <textarea class="form-control" placeholder="Describe your Listing" name="description"></textarea>
          <label for="description">Description</label>
        </div>

        <div class="d-flex my-4 gap-5 align-items-center">
          <button class="btn" type="reset">Cancel</button>
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>`;
  setHTML("formDiv", template);

  document.getElementById("addListing").innerText = "🏬 Add Job";
}

export class JobsController {
  constructor() {
    console.log("the jobs controller");
  }

  showJobs() {
    drawJobs();
  }

  addJobs() {
    try {
      window.event.preventDefault();
      const form = window.event.target;
      let formData = getFormData(form);
      jobsService.addJob(formData);
      drawJobs();
    } catch (error) {
      console.log("addJob", error);
    }
  }
}
