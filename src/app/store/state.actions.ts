import { createAction, props } from "@ngrx/store";

export const loadCustomerData = createAction('[customer component] loadCustomerData')

export const addCustomerData = createAction('[customer component] addCustomerData',props<{customerData:any}>())

export const loadCustomerDataFailure = createAction('[customer component] loadCustomerDataFailure',props<{errorMessage:string}>())

export const addSingleCustomerData = createAction('[customer component] addSingleCustomerData',props<{SingleCustomerData:any}>())