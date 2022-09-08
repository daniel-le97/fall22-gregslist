import { appState } from "../AppState.js";
import { Car } from "../Models/Car.js";
import { carsService } from "../Services/CarsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { setHTML } from "../Utils/Writer.js";

function drawCars() {
  let template = "";
  appState.cars.forEach((car) => (template += car.CarCardTemplate));
  // TODO trigger bad set
  setHTML("listings", template);
  _drawCarsForm();
}

function _drawCarsForm() {
  let template = "";
  template += /*html*/ `
  <form onsubmit="app.carsController.addCar()">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="make" required minlength="3" maxlength="20">
          <label for="make">Make</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" class="form-control" name="model" required>
          <label for="model">Model</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="year" required min="1886" max="9999">
          <label for="year">Year</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" name="price" required min="0">
          <label for="price">Price</label>
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
  document.getElementById("formDiv").innerHTML = template;

  document.getElementById("addListing").innerText = "🚗 Add Car";
}
function _drawButton() {}

export class CarsController {
  constructor() {
    drawCars();
    // NOTE draw cars on page load do not do this for houses or jobs

    // NOTE Sets up a listener to be triggered each time a change occurs to the cars array causing the page to re-render each of the cars
    appState.on("cars", drawCars);
  }

  showCars() {
    drawCars();
  }

  // test() {
  //   // NOTE NEVER DO THIS TESTING ONLY

  //   let testCar = new Car({ make: 'Test', model: 'Car', imgUrl: 'https://conti-engineering.com/wp-content/uploads/2020/05/VirtualVehicleTest_Beitrag.jpg', year: 2000, price: 2000, description: 'test only' })

  //   // NEVER manipulate data directly from a controller its a big NO NO
  //   appState.cars = [testCar, ...appState.cars]

  // }

  addCar() {
    try {
      // REVIEW FORM SUBMISSION EXAMPLE
      // THE THREE THINGS WE DO WITH EVERY FORM SUBMISSION!!!!
      // @ts-ignore
      window.event.preventDefault();
      // @ts-ignore
      const form = window.event.target;
      let formData = getFormData(form);

      carsService.addCar(formData);

      // @ts-ignore
      form.reset();
    } catch (error) {
      console.error("addCar", error);
    }
  }
}
