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
    return this.http.get('https://json-server-app-u17t.onrender.com/fleetManagers')
   }

   /**
   *=============== Get Single Fleet Manager ==========================
   */

   public getSinglefleetManager(name:any) {
    return this.http.get(`https://json-server-app-u17t.onrender.com/fleetManagers?name=${name}`)
   }

   /**
   *=============== Create Fleet Managers ==========================
   */

   public createFleetMamager(obj:any) {
    return this.http.post('https://json-server-app-u17t.onrender.com/fleetManagers', obj)
   }

   /**
   *=============== Create Fleet ==========================
   */

   public createFleet(obj:any) {
    return this.http.post('https://json-server-app-u17t.onrender.com/fleets',obj)
   }

   /**
   *=============== Get All Fleets ==========================
   */

  public getAllFleets() {
    return this.http.get('https://json-server-app-u17t.onrender.com/fleets')
  }

  /**
   *=============== Get Single Fleet Data ==========================
   */

  public getSingleFleetData(fleetId:any) {
    return this.http.get(`https://json-server-app-u17t.onrender.com/fleets/${fleetId}`)
  }

  /**
   *=============== Edit Fleet Data ==========================
   */

   public EditFleetData(EditId:any, EditObj:any) {
    return this.http.put(`https://json-server-app-u17t.onrender.com/fleets/${EditId}`,EditObj)
   }

   /**
   *=============== Delete Fleet Data ==========================
   */

   public DeleteFleetData(DelId:any) {
    return this.http.delete(`https://json-server-app-u17t.onrender.com/fleets/${DelId}`)
   }
}
