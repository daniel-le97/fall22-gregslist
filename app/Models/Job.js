import { generateId } from "../Utils/generateId.js";

export class Job {
  /**
   * The data needed to job a car
   * @param {{job: string, company: string, hours: number, salary: number, description: string, imgUrl: string, id?:string}} data
   */
  constructor(data) {
    this.id = data.id || generateId();
    this.job = data.job;
    this.imgUrl = data.imgUrl;
    this.company = data.company;
    this.hours = data.hours;
    this.salary = data.salary;
    this.description = data.description;
  }

  get JobListingTemplate() {
    return /*html*/ `
    <div class="col-md-4 col-lg-3 mb-3">
      <div class="card">
        <img src="${this.imgUrl}" alt="${this.company}-${this.job}" class="img-fluid">
        <div class="card-body">
          <h5 class="text-uppercase">
            ${this.job} | ${this.company} ${this.hours}
          </h5>
          <p>
            <strong>$ ${this.salary}</strong>
          </p>
          <p>${this.description}</p>
        </div>
      </div>
    </div>
    `;
  }
  get Template() {
    return /*html*/ `
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
      </form>
    `;
  }
}
