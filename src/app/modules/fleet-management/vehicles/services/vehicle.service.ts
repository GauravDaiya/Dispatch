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
    return this.http.get('https://json-server-app-u17t.onrender.com/fuelTypeList');
   }

   /**
   *=============== Get Complet PlateType List  ==========================
   */

   public getPlateList() {
    return this.http.get('https://json-server-app-u17t.onrender.com/plateTypeList');
   }

    /**
   *=============== Get All Vehicle List  ==========================
   */

   public getVehicleList() {
    return this.http.get('https://json-server-app-u17t.onrender.com/vehicles');
   }

   /**
   *=============== Add Vehicle  ==========================
   */

   public addVehicle(vehicleData:any) {
    return this.http.post('https://json-server-app-u17t.onrender.com/vehicles',vehicleData)
   }
}
