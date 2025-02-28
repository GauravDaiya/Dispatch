import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { catchError, exhaustMap, Observable, of, switchMap, tap } from "rxjs";
import { VehicleService } from "../vehicles/services/vehicle.service";

export interface VehicleState {
    VehicleData: any[]
}

@Injectable()

export class VehicleStore extends ComponentStore<VehicleState> {

    constructor(
        private _VehicleService: VehicleService
    ) {
        super({ VehicleData: [] })
    }

    readonly VehicleList$ = this.select(state => state.VehicleData);

    readonly loadVehicleData = this.updater((state, vehicleListData: any) => {
        return {
            ...state,
            VehicleData: vehicleListData
        }
    })

    private readonly createVehicle = this.updater((state, singlevehicledata: any) => ({
        ...state,
        VehicleData: [...state.VehicleData, singlevehicledata]
    }))

    readonly addSingleVehicleData = this.effect<any>((singleVehicleData$: Observable<any>) => {
        return singleVehicleData$.pipe(
            switchMap((singleVehicleData) =>
                this._VehicleService.addVehicle(singleVehicleData).pipe(
                    tap(
                        (apiRes) => {
                            this.createVehicle(apiRes);
                        }
                    )
                )
            )
        )
    })

    readonly loadVehicles = this.effect<void>((trigger$) => {
        return trigger$.pipe(
            exhaustMap(() =>
                this._VehicleService.getVehicleList().pipe(
                    tap((data: any) => {
                        console.log('2')
                        console.log('Data received from API:', data);
                        this.loadVehicleData(data);
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
