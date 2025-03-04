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
    return this.http.get(`https://json-server-app-u17t.onrender.com/customer/${customerId}`)
  }

  /**
   *=============== Add Customers ==========================
   */
  public createCustomer(customerData: any) {
    return this.http.post('https://json-server-app-u17t.onrender.com/customer', customerData)
  }

  /**
 *=============== Get All Customers List ==========================
 */
  public getCustomers(): Observable<any []> {
    return this.http.get<any []>('https://json-server-app-u17t.onrender.com/customer')
  }

   /**
 *=============== Search Customers ==========================
 */
 public searchCustomers(SearchString:string) {
  return this.http.get(`https://json-server-app-u17t.onrender.com/customer?firstName=${SearchString}`)
}

  /**
 *=============== Edit Customer ==========================
 */
  public editCustomer(customerId: any, updatedCustomerData: any) {
    return this.http.put(`https://json-server-app-u17t.onrender.com/customer/${customerId}`, updatedCustomerData)
  }

  /**
    *=============== Remove Customer ==========================
    */
  public DeleteCustomerService(DelId: any) {
    return this.http.delete(`https://json-server-app-u17t.onrender.com/customer/${DelId}`)
  }
}
