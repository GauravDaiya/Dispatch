import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { catchError, exhaustMap, Observable, of, switchMap, tap } from "rxjs";
import { DriverService } from "../driver/services/driver.service";


export interface DriverState {
    DriversData: any[],
    DriverReadById: any
}

@Injectable()

export class DriverStore extends ComponentStore<DriverState> {

    constructor(
        private _DriverService: DriverService
    ) {
        super({ DriversData: [], DriverReadById: {} })
    }

    readonly Drivers$ = this.select(state => state.DriversData);
    readonly DriverDataById$ = this.select(state => state.DriverReadById);

    readonly loadDriversData = this.updater((state, driverData: any) => {
        return {
            ...state,
            DriversData: driverData
        }
    })

    private readonly DriverDataById = this.updater((state, driverIdData: any) => ({
        ...state,
        DriverReadById: driverIdData
    }))

    private readonly createDriver = this.updater((state, singleDriverData: any) => ({
        ...state,
        DriversData: [...state.DriversData, singleDriverData]
    }))

    private readonly updateDriver = this.updater((state, { updId, updDriverData }: { updId: any, updDriverData: any }) => {
        const updatedDriverData = state.DriversData.map(driver => {
            if (driver.id === updId) {
                return { ...driver, ...updDriverData };
            }
            return driver;
        });

        return {
            ...state,
            DriversData: updatedDriverData
        };
    })

    private readonly updateDriverStatus = this.updater((state, { updId, updStatus }: { updId: any, updStatus: any }) => {
        const updatedDriverStatus = state.DriversData.map(driver => {
            if (driver.id === updId) {
                return { ...driver, status: updStatus};
            }
            return driver;
        });

        return {
            ...state,
            DriversData: updatedDriverStatus
        };
    })

    private readonly deleteDriver = this.updater((state, delId: any) => {
        const updatedDriverData = state.DriversData.filter((v, i) => v.id != delId);
        return ({
            ...state,
            DriversData: updatedDriverData
        })
    })

    readonly loadAllDrivers = this.effect<void>((trigger$) => {
        return trigger$.pipe(
            exhaustMap(() =>
                this._DriverService.getAllDrivers().pipe(
                    tap((data: any) => {
                        console.log('2')
                        console.log('Data received from API:', data);
                        this.loadDriversData(data);
                    }),
                    catchError((error) => {
                        console.error('Error fetching Driver:', error);
                        return of([]); // Return empty array on error
                    })
                )
            )
        );
    });

    readonly addSingleDriverData = this.effect<any>((singleDriverData$: Observable<any>) => {
        return singleDriverData$.pipe(
            switchMap((singleDriverData) =>
                this._DriverService.createDriver(singleDriverData).pipe(
                    tap(
                        (apiRes) => {
                            this.createDriver(apiRes);
                        }
                    )
                )
            )
        )
    })

    readonly getDriverDataById = this.effect<any>((driverId$: Observable<any>) => {
        return driverId$.pipe(
            switchMap((driverId) =>
                this._DriverService.getDriverById(driverId).pipe(
                    tap(
                        (apiRes) => {
                            if (apiRes) {
                                this.DriverDataById(apiRes)
                            }
                        }
                    )
                )
            )
        )
    })

    updateSingleDriverData = this.effect<any>((updSingleDriverData$: Observable<any>) => {
        return updSingleDriverData$.pipe(
            switchMap(({ updId, updDriverData }) =>
                this._DriverService.editDriverData(updId, updDriverData).pipe(
                    tap(
                        (apiRes) => {
                            if (apiRes) {
                                this.updateDriver({ updId, updDriverData })
                            }
                        }
                    )
                )
            )
        )
    })

    updateSingleDriverStatus = this.effect<any>((updSingleDriverStatus$: Observable<any>) => {
        return updSingleDriverStatus$.pipe(
            switchMap(({ updId, updStatus }) =>
                this._DriverService.updateDriverStatus(updId, updStatus).pipe(
                    tap(
                        (apiRes) => {
                            if (apiRes) {
                                this.updateDriverStatus({ updId, updStatus })
                            }
                        }
                    )
                )
            )
        )
    })

    readonly deleteSingleDriverData = this.effect<any>((delId$: Observable<any>) => {
        return delId$.pipe(
            switchMap((delId) =>
                this._DriverService.DeleteDriverData(delId).pipe(
                    tap(
                        (apiRes) => {
                            if (apiRes) {
                                this.deleteDriver(delId)
                            }
                        }
                    )
                )
            )
        )
    })


}