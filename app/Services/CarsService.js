import { appState } from "../AppState.js";
import { Car } from "../Models/Car.js";
import { saveState } from "../Utils/Store.js";

class CarsService {
  addCar(formData) {
    let car = new Car(formData)
    appState.cars = [car, ...appState.cars]
    saveState('cars', appState.cars)
    
  }
}

// REVIEW SINGLETON PATTERN for services
export const carsService = new CarsService()