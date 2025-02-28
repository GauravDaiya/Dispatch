import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { catchError, exhaustMap, of, tap } from "rxjs";
import { VehicleService } from "../vehicles/services/vehicle.service";

export interface PlateState {
    PlateListData: any[]
}

@Injectable()

export class PlateTypeStore extends ComponentStore<PlateState> {

    constructor(
        private _VehicleService: VehicleService
    ) {
        super({ PlateListData: [] })
    }

    readonly PlateTypeList$ = this.select(state => state.PlateListData);

    readonly loadPlateTypeData = this.updater((state, plateListData: any) => {
        return {
            ...state,
            PlateListData: plateListData
        }
    })

    readonly loadPlateType = this.effect<void>((trigger$) => {
        return trigger$.pipe(
            exhaustMap(() =>
                this._VehicleService.getPlateList().pipe(
                    tap((data: any) => {
                        console.log('2')
                        console.log('Data received from API:', data);
                        this.loadPlateTypeData(data);
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
