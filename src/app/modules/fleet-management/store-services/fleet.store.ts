import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { catchError, exhaustMap, Observable, of, switchMap, tap } from "rxjs";
import { FleetService } from "../fleet/services/fleet.service";

export interface FleetState {
    FleetData: any[],
    fleetManagers: any[],
    singleFleetManager: any,
    fleetReadById: any
}

@Injectable()

export class FleetStore extends ComponentStore<FleetState> {

    constructor(
        private _FleetService: FleetService,
    ) {
        super({ FleetData: [], fleetManagers: [], singleFleetManager: {}, fleetReadById: {} })
    }


    readonly FleetData$ = this.select(state => state.FleetData);
    readonly FleetDataById$ = this.select(state => state.fleetReadById);
    readonly FleetManagers$ = this.select(state => state.fleetManagers)
    readonly SingleFleetManager$= this.select(state => state.singleFleetManager)


    readonly loadFleetData = this.updater((state, fleetData: any) => {
        return {
            ...state,
            FleetData: fleetData
        }
    })

    readonly loadFleetManagers = this.updater((state, fleetManagersData:any) => {
        return {
            ...state,
            fleetManagers: fleetManagersData
        }
    })

    private readonly fleedDataById = this.updater((state,fleetIdData:any) => ({
        ...state,
        fleetReadById: fleetIdData
    }))

    private readonly singleFleetManager = this.updater((state,singleFleetManagerData:any) => ({
        ...state,
        singleFleetManager: singleFleetManagerData
    }))


    private readonly createFleet = this.updater((state, singlefleetdata: any) => ({
        ...state,
        FleetData: [...state.FleetData, singlefleetdata]
    }))

    private readonly createFleetManager = this.updater((state, singlefleetManager: any) => ({
        ...state,
        fleetManagers: [...state.fleetManagers, singlefleetManager]
    }))

    private readonly deleteFleet = this.updater((state, delId: any) => {
        const updatedFleetData = state.FleetData.filter((v, i) => v.id != delId);
        return ({
            ...state,
            FleetData: updatedFleetData
        })
    })

    private readonly updateFleet = this.updater((state, { updId, updFleetData }: { updId: any, updFleetData: any }) => {
        const updatedFleetData = state.FleetData.map(fleet => {
            if (fleet.id === updId) {
                return { ...fleet, ...updFleetData };
            }
            return fleet;
        });

        return {
            ...state,
            FleetData: updatedFleetData
        };
    })

    readonly loadAllFleets = this.effect<void>((trigger$) => {
        return trigger$.pipe(
            exhaustMap(() =>
                this._FleetService.getAllFleets().pipe(
                    tap((data: any) => {
                        console.log('2')
                        console.log('Data received from API:', data);
                        this.loadFleetData(data);
                    }),
                    catchError((error) => {
                        console.error('Error fetching Fleets:', error);
                        return of([]); // Return empty array on error
                    })
                )
            )
        );
    });

    readonly loadAllFleetManagers = this.effect<void>((trigger$) => {
        return trigger$.pipe(
            exhaustMap(() =>
                this._FleetService.getAllfleetManagers().pipe(
                    tap((data: any) => {
                        console.log('2')
                        console.log('Data received from API:', data);
                        this.loadFleetManagers(data);
                    }),
                    catchError((error) => {
                        console.error('Error fetching Fleets:', error);
                        return of([]); // Return empty array on error
                    })
                )
            )
        );
    });


    readonly addSingleFleetData = this.effect<any>((singleFleetData$: Observable<any>) => {
        return singleFleetData$.pipe(
            switchMap((singleFleetData) =>
                this._FleetService.createFleet(singleFleetData).pipe(
                    tap(
                        (apiRes) => {
                            this.createFleet(apiRes);
                        }
                    )
                )
            )
        )
    })

    readonly addSingleFleetManager = this.effect<any>((singleFleetManagerData$: Observable<any>) => {
        return singleFleetManagerData$.pipe(
            switchMap((singleFleetManagerData) =>
                this._FleetService.createFleetMamager(singleFleetManagerData).pipe(
                    tap(
                        (apiRes) => {
                            this.createFleetManager(apiRes);
                        }
                    )
                )
            )
        )
    })

    readonly deleteSingleFleetData = this.effect<any>((delId$: Observable<any>) => {
        return delId$.pipe(
            switchMap((delId) =>
                this._FleetService.DeleteFleetData(delId).pipe(
                    tap(
                        (apiRes) => {
                            if (apiRes) {
                                this.deleteFleet(delId)
                            }
                        }
                    )
                )
            )
        )
    })

    updateSingleFleetData = this.effect<any>((updSingleFleetData$: Observable<any>) => {
        return updSingleFleetData$.pipe(
            switchMap(({ updId, updFleetData }) =>
                this._FleetService.EditFleetData(updId, updFleetData).pipe(
                    tap(
                        (apiRes) => {
                            if (apiRes) {
                                this.updateFleet({ updId, updFleetData })
                            }
                        }
                    )
                )
            )
        )
    })

    readonly getFleetDataById = this.effect<any>((fleetId$: Observable<any>) => {
        return fleetId$.pipe(
            switchMap((fleetId) =>
                this._FleetService.getSingleFleetData(fleetId).pipe(
                    tap(
                        (apiRes) => {
                            if (apiRes) {
                                this.fleedDataById(apiRes)
                            }
                        }
                    )
                )
            )
        )
    })

    readonly getSingleFleetManager = this.effect<any>((name$: Observable<any>) => {
        return name$.pipe(
            switchMap((name) =>
                this._FleetService.getSinglefleetManager(name).pipe(
                    tap(
                        (apiRes) => {
                            if (apiRes) {
                                this.singleFleetManager(apiRes)
                            }
                        }
                    )
                )
            )
        )
    })


}