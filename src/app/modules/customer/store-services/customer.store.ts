import { Injectable, OnInit } from "@angular/core";
import {ComponentStore} from "@ngrx/component-store"
import { catchError, exhaustMap, Observable, of, switchMap, tap } from "rxjs";
import { CustomerService } from "../services/customer.service";

export interface CustomerState {
  CustomerData: any [],
}

@Injectable()

export class CustomerStore extends ComponentStore<CustomerState>  {

  constructor(
    private _CustomerService: CustomerService,
  ) {
    console.log('1');
    super({CustomerData : []});
    
  }


  readonly CustomerData$ = this.select(state => state.CustomerData);

  readonly loadcustomerdata = this.updater((state, customerdata: any) => {
    console.log('3')
    console.log('Updating store with customer data:', customerdata);  // Log when the state is being updated
    return {
      ...state,
      CustomerData: customerdata
    };
  });
  

  private readonly createCustomer = this.updater((state,singlecustomerdata:any) => ({
    ...state,
    CustomerData : [...state.CustomerData,singlecustomerdata]
  }))

  private readonly deleteCustomer = this.updater((state,delId:any) => {
    const updatedCustomerData = state.CustomerData.filter((v,i) => v.id != delId);
    return ({
      ...state,
      CustomerData: updatedCustomerData
    })
  })

  private readonly updateCustomer = this.updater((state,{ updId, updCustomerData }: { updId: any, updCustomerData: any }) => {
    const updatedCustomerData = state.CustomerData.map(customer => {
      if (customer.id === updId) {
        return { ...customer, ...updCustomerData };
      }
      return customer;
    });
  
    return {
      ...state,
      CustomerData: updatedCustomerData
    };
  })

  loadAllCustomers = this.effect<void>((trigger$) => {
    return trigger$.pipe(
      exhaustMap(() =>
        this._CustomerService.getCustomers().pipe(
          tap((data: any) => {
            console.log('2')
            console.log('Data received from API:', data);
            this.loadcustomerdata(data);
          }),
          catchError((error) => {
            console.error('Error fetching customers:', error);
            return of([]); // Return empty array on error
          })
        )
      )
    );
  });

  readonly addSingleCustomerData = this.effect<any>((singleCustomerData$: Observable<any>) => {
    return singleCustomerData$.pipe(
      switchMap((singleCustomerData) =>
        this._CustomerService.createCustomer(singleCustomerData).pipe(
          tap(
            (apiRes) => {
              this.createCustomer(apiRes);
            }
          )
        )
      )
    )
  })

  readonly deleteSingleCustomerData = this.effect<any>((delId$:Observable<any>) => {
    return delId$.pipe(
      switchMap((delId) =>
        this._CustomerService.DeleteCustomerService(delId).pipe(
          tap(
            (apiRes) => {
              if(apiRes) {
                this.deleteCustomer(delId)
              }
            }
          )
        )
      )
    )
  })

  updateSingleCustomerData = this.effect<any>((updSingleCustomerData$:Observable<any>) => {
    return updSingleCustomerData$.pipe(
      switchMap(({ updId, updCustomerData }) =>
        this._CustomerService.editCustomer(updId , updCustomerData).pipe(
          tap(
            (apiRes) => {
              if(apiRes) {
                this.updateCustomer({updId,updCustomerData})
              }
            }
          )
        )
      )
    )
  })

}