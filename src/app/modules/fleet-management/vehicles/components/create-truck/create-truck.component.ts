import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { FleetStore } from '../../../store-services/fleet.store';
import { FuelTypeStore } from '../../../store-services/fuelType.store';
import { PlateTypeStore } from '../../../store-services/plateType.store';
import { DriverStore } from '../../../store-services/driver.store';
import { VehicleStore } from '../../../store-services/vehicle.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-truck',
  templateUrl: './create-truck.component.html',
  styleUrl: './create-truck.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CreateTruckComponent implements OnInit {
  public TruckForm!: FormGroup;
  public editId: any = '';
  public editMode: boolean = false;
  public filteredFleetOptions!: Observable<string[]>;
  public filteredDriverOptions!: Observable<string[]>;
  public driverList!: any[];
  public driverNameList!: any[];
  public fleetList!: any[];
  public fleetNameList!: any[];
  public fuelTypes!: any[];
  public plateTypes!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private Fleetstore: FleetStore,
    private fueltypestore: FuelTypeStore,
    private Driverstore: DriverStore,
    private platetypestore: PlateTypeStore,
    private vehiclestore: VehicleStore
  ) {

  }
  ngOnInit(): void {
    this.createTruckForm();
    this.Fleetstore.loadAllFleets();
    this.fueltypestore.loadFuelType();
    this.platetypestore.loadPlateType();
    this.Driverstore.loadAllDrivers();
    this.Fleetstore.FleetData$.subscribe((fleetListRes: any) => {
      this.fleetList = fleetListRes;
      console.log(fleetListRes)
      this.fleetNameList = fleetListRes.map((opt: any) => {
        return opt.fleetname
      })
      console.log(this.fleetNameList);
      this.filteredFleetOptions = this.TruckForm.controls['searchFleet'].valueChanges.pipe(
        startWith(''),
        map(value => {
          if (value == '' || this.fleetNameList.includes(value)) {
            return this.fleetNameList
          } else {
            console.log('h')
            return this.Fleetfilter(value || '')
          }
        })
      )
    });
    this.Driverstore.Drivers$.subscribe((DriverListRes) => {
      this.driverList = DriverListRes;
      this.driverNameList = DriverListRes.map((opt: any) => {
        return opt.name
      })
      console.log(this.driverNameList)
      this.filteredDriverOptions = this.TruckForm.controls['searchDriver'].valueChanges.pipe(
        startWith(''),
        map(value => {
          if (value == '' || this.driverNameList.includes(value)) {
            return this.driverNameList
          } else {
            console.log('h')
            return this.Driverfilter(value || '')
          }
        })
      )
      this.filteredDriverOptions.subscribe((res) => {
        console.log(res)
      })
      
    })
    this.fueltypestore.FuelTypeList$.subscribe((FuelListRes) => {
      this.fuelTypes = FuelListRes;
      console.log(this.fuelTypes)
    });
    this.platetypestore.PlateTypeList$.subscribe((PlateListRes) => {
      this.plateTypes = PlateListRes;
      console.log(this.plateTypes)
    })
  }

  public createTruckForm() {
    this.TruckForm = this.formBuilder.group({
      operationalStatus: ["active",[Validators.required]],
      searchFleet: ["",[Validators.required]],
      unitNumber: ["", [Validators.required]],
      searchDriver: ["", [Validators.required]],
      make: ["", [Validators.required]],
      model: ["", [Validators.required]],
      modelYear: ["", [Validators.required]],
      fuelType: ["", [Validators.required]],
      plateType: ["", [Validators.required]],
      ownershipStatus: ["owned", [Validators.required]]
    })
  }

  public createTruck() {
    const truckFormValue = this.TruckForm.value;
    const UpdatedTruckFormValue = {
      ...truckFormValue,
      VehicleType: 'Truck',
      VehicleName: `${truckFormValue.make} ${truckFormValue.model}`
    }
    this.vehiclestore.addSingleVehicleData(UpdatedTruckFormValue);
    this.router.navigateByUrl('/fleet-management/vehicles')
    
  }

  private Fleetfilter(value: string): string[] {

    const filterValue = value.toLowerCase();
    return this.fleetList.filter((option: any) =>
      option.fleetname.toLowerCase().includes(filterValue)
    ).map((option: any) => option.fleetname);
  }

  private Driverfilter(value: string): string[] {

    const filterValue = value.toLowerCase();
    return this.driverList.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    ).map((option: any) => option.name);
  }
}
