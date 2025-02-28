import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { catchError, exhaustMap, of, tap } from "rxjs";
import { VehicleService } from "../vehicles/services/vehicle.service";

export interface FuelState {
    FuelListData: any[]
}

@Injectable()

export class FuelTypeStore extends ComponentStore<FuelState> {

    constructor(
        private _VehicleService: VehicleService
    ) {
        super({ FuelListData: [] })
    }

    readonly FuelTypeList$ = this.select(state => state.FuelListData);

    readonly loadFuelTypeData = this.updater((state, fuelListData: any) => {
        return {
            ...state,
            FuelListData: fuelListData
        }
    })

    readonly loadFuelType = this.effect<void>((trigger$) => {
        return trigger$.pipe(
            exhaustMap(() =>
                this._VehicleService.getFuelList().pipe(
                    tap((data: any) => {
                        console.log('2')
                        console.log('Data received from API:', data);
                        this.loadFuelTypeData(data);
                    }),
                    catchError((error) => {
                        console.error('Error fetching Fleets:', error);
                        return of([]); // Return empty array on error
                    })
                )
            )
        );
    });
}
