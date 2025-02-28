import { effect, Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import * as CustomerActions from './state.actions'
import { switchMap, map, catchError, mergeMap, exhaustMap } from 'rxjs/operators';
import { CustomerService } from '../modules/customer/services/customer.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';


@Injectable()
export class CustomerEffects {

    constructor(
        private actions$: Actions,
        private _CustomerService: CustomerService,
    ) {
      console.log(this.actions$)
    }

    // Effect to load customer data
    
    // loadcustomer$:Observable<Action> = createEffect(() =>
    //     this.actions$.pipe(
    //       ofType(CustomerActions.loadCustomerData),
          
    //     )
    //   );

}
