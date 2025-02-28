import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   *=============== Get Single Customer ==========================
   */
  public getCustomerReadByIdService(customerId: any) {
    return this.http.get(`http://localhost:3000/customer/${customerId}`)
  }

  /**
   *=============== Add Customers ==========================
   */
  public createCustomer(customerData: any) {
    return this.http.post('http://localhost:3000/customer', customerData)
  }

  /**
 *=============== Get All Customers List ==========================
 */
  public getCustomers(): Observable<any []> {
    return this.http.get<any []>('http://localhost:3000/customer')
  }

   /**
 *=============== Search Customers ==========================
 */
 public searchCustomers(SearchString:string) {
  return this.http.get(`http://localhost:3000/customer?firstName=${SearchString}`)
}

  /**
 *=============== Edit Customer ==========================
 */
  public editCustomer(customerId: any, updatedCustomerData: any) {
    return this.http.put(`http://localhost:3000/customer/${customerId}`, updatedCustomerData)
  }

  /**
    *=============== Remove Customer ==========================
    */
  public DeleteCustomerService(DelId: any) {
    return this.http.delete(`http://localhost:3000/customer/${DelId}`)
  }
}
