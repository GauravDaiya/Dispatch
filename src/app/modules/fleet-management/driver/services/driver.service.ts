import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  /**
  *=============== Get All Drivers ==========================
  */

  public getAllDrivers() {
    return this.http.get('https://json-server-app-u17t.onrender.com/drivers')
  }

  /**
  *=============== Create Driver ==========================
  */

  public createDriver(obj: any) {
    return this.http.post('https://json-server-app-u17t.onrender.com/drivers', obj)
  }

  /**
  *=============== Get Driver By Id ==========================
  */

  public getDriverById(id: any) {
    return this.http.get(`https://json-server-app-u17t.onrender.com/drivers/${id}`)
  }

  /**
  *=============== Update Driver Status By Id ==========================
  */

  public updateDriverStatus(updId:any , updStatus:any) {
    console.log(updId,updStatus)
    return this.http.patch(`https://json-server-app-u17t.onrender.com/drivers/${updId}`, {status : updStatus})
  }

  /**
  *=============== Edit Driver Data ==========================
  */

  public editDriverData(EditId: any, EditObj: any) {
    return this.http.put(`https://json-server-app-u17t.onrender.com/drivers/${EditId}`, EditObj)
  }

  /**
  *=============== Delete Driver Data ==========================
  */

  public DeleteDriverData(DelId: any) {
    return this.http.delete(`https://json-server-app-u17t.onrender.com/drivers/${DelId}`)
  }
}
