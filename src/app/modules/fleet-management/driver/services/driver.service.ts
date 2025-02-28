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
    return this.http.get('http://localhost:3000/drivers')
  }

  /**
  *=============== Create Driver ==========================
  */

  public createDriver(obj: any) {
    return this.http.post('http://localhost:3000/drivers', obj)
  }

  /**
  *=============== Get Driver By Id ==========================
  */

  public getDriverById(id: any) {
    return this.http.get(`http://localhost:3000/drivers/${id}`)
  }

  /**
  *=============== Update Driver Status By Id ==========================
  */

  public updateDriverStatus(updId:any , updStatus:any) {
    console.log(updId,updStatus)
    return this.http.patch(`http://localhost:3000/drivers/${updId}`, {status : updStatus})
  }

  /**
  *=============== Edit Driver Data ==========================
  */

  public editDriverData(EditId: any, EditObj: any) {
    return this.http.put(`http://localhost:3000/drivers/${EditId}`, EditObj)
  }

  /**
  *=============== Delete Driver Data ==========================
  */

  public DeleteDriverData(DelId: any) {
    return this.http.delete(`http://localhost:3000/drivers/${DelId}`)
  }
}
