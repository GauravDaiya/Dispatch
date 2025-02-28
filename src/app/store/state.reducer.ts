import { createReducer, on } from "@ngrx/store"
import { addCustomerData, addSingleCustomerData, loadCustomerDataFailure } from "./state.actions"

export interface CustomerState {
    CustomerData: any [],
    error:string|null
}

export const initialState:CustomerState = {
    CustomerData : [],
    error:null
}

export const customerReducer = createReducer(
    initialState,
    on(addCustomerData , (state,customerData:any) => {
        console.log(customerData)
        return {
            ...state,
            CustomerData : customerData
        }
    }),
    on(loadCustomerDataFailure,(state, {errorMessage}) => {
        return {
            ...state,
            error:errorMessage
        }
    }),
    on(addSingleCustomerData , (state,SingleCustomerData) => {
        return {
            ...state,
            CustomerData : [...state.CustomerData,SingleCustomerData]
        }
    })
)