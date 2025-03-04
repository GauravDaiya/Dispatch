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
    return this.http.get(`https://gauravdaiya.github.io/DispatchDb/db.json/customer/${customerId}`)
  }

  /**
   *=============== Add Customers ==========================
   */
  public createCustomer(customerData: any) {
    return this.http.post('https://gauravdaiya.github.io/DispatchDb/db.json/customer', customerData)
  }

  /**
 *=============== Get All Customers List ==========================
 */
  public getCustomers(): Observable<any []> {
    return this.http.get<any []>('https://gauravdaiya.github.io/DispatchDb/db.json/customer')
  }

   /**
 *=============== Search Customers ==========================
 */
 public searchCustomers(SearchString:string) {
  return this.http.get(`https://gauravdaiya.github.io/DispatchDb/db.json/customer?firstName=${SearchString}`)
}

  /**
 *=============== Edit Customer ==========================
 */
  public editCustomer(customerId: any, updatedCustomerData: any) {
    return this.http.put(`https://gauravdaiya.github.io/DispatchDb/db.json/customer/${customerId}`, updatedCustomerData)
  }

  /**
    *=============== Remove Customer ==========================
    */
  public DeleteCustomerService(DelId: any) {
    return this.http.delete(`https://gauravdaiya.github.io/DispatchDb/db.json/customer/${DelId}`)
  }
}
