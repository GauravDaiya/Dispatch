import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  constructor(private http: HttpClient) { }

  /**
   *=============== Get All Fleet Managers ==========================
   */

   public getAllfleetManagers() {
    return this.http.get('http://localhost:3000/fleetManagers')
   }

   /**
   *=============== Get Single Fleet Manager ==========================
   */

   public getSinglefleetManager(name:any) {
    return this.http.get(`http://localhost:3000/fleetManagers?name=${name}`)
   }

   /**
   *=============== Create Fleet Managers ==========================
   */

   public createFleetMamager(obj:any) {
    return this.http.post('http://localhost:3000/fleetManagers', obj)
   }

   /**
   *=============== Create Fleet ==========================
   */

   public createFleet(obj:any) {
    return this.http.post('http://localhost:3000/fleets',obj)
   }

   /**
   *=============== Get All Fleets ==========================
   */

  public getAllFleets() {
    return this.http.get('http://localhost:3000/fleets')
  }

  /**
   *=============== Get Single Fleet Data ==========================
   */

  public getSingleFleetData(fleetId:any) {
    return this.http.get(`http://localhost:3000/fleets/${fleetId}`)
  }

  /**
   *=============== Edit Fleet Data ==========================
   */

   public EditFleetData(EditId:any, EditObj:any) {
    return this.http.put(`http://localhost:3000/fleets/${EditId}`,EditObj)
   }

   /**
   *=============== Delete Fleet Data ==========================
   */

   public DeleteFleetData(DelId:any) {
    return this.http.delete(`http://localhost:3000/fleets/${DelId}`)
   }
}
