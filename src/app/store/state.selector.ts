import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { CustomerState } from "./state.reducer";

export const selectcustomerdata = (state:AppState) => state.customer;

export const selectCustomerData = createSelector(
    selectcustomerdata,
    (state:CustomerState) => state.CustomerData
)