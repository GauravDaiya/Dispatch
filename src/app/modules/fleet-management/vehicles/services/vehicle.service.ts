import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  /**
   *=============== Get Complet FuelType List  ==========================
   */

   public getFuelList() {
    return this.http.get('http://localhost:3000/fuelTypeList');
   }

   /**
   *=============== Get Complet PlateType List  ==========================
   */

   public getPlateList() {
    return this.http.get('http://localhost:3000/plateTypeList');
   }

    /**
   *=============== Get All Vehicle List  ==========================
   */

   public getVehicleList() {
    return this.http.get('http://localhost:3000/vehicles');
   }

   /**
   *=============== Add Vehicle  ==========================
   */

   public addVehicle(vehicleData:any) {
    return this.http.post('http://localhost:3000/vehicles',vehicleData)
   }
}
