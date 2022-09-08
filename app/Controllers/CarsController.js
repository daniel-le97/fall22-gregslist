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
  // _drawCarsForm();
}

// function _drawCarsForm() {
//   let template = "";

//   document.getElementById("formDiv").innerHTML = template;
// }

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
