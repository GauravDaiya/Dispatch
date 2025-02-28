import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { FleetStore } from '../../../store-services/fleet.store';
import { PlateTypeStore } from '../../../store-services/plateType.store';
import { VehicleStore } from '../../../store-services/vehicle.store';

@Component({
  selector: 'app-create-trailer',
  templateUrl: './create-trailer.component.html',
  styleUrl: './create-trailer.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CreateTrailerComponent implements OnInit {

  public TrailerForm!: FormGroup;
  public editId: any = '';
  public editMode: boolean = false;
  public filteredFleetOptions!: Observable<string[]>;
  public fleetList!: any[];
  public fleetNameList!: any[];
  public fuelTypes!: any[];
  public plateTypes!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private Fleetstore: FleetStore,
    private platetypestore: PlateTypeStore,
    private vehiclestore: VehicleStore
  ) { }

  ngOnInit(): void {
    this.createTailerForm();
    this.Fleetstore.loadAllFleets();
    this.platetypestore.loadPlateType();
    this.Fleetstore.FleetData$.subscribe((fleetListRes: any) => {
      this.fleetList = fleetListRes;
      console.log(fleetListRes)
      this.fleetNameList = fleetListRes.map((opt: any) => {
        return opt.fleetname
      })
      console.log(this.fleetNameList);
      this.filteredFleetOptions = this.TrailerForm.controls['searchFleet'].valueChanges.pipe(
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
    this.platetypestore.PlateTypeList$.subscribe((PlateListRes) => {
      this.plateTypes = PlateListRes;
      console.log(this.plateTypes)
    })
  }

  public createTailerForm() {
    this.TrailerForm = this.formBuilder.group({
      operationalStatus: ["active", [Validators.required]],
      searchFleet: ["", [Validators.required]],
      unitNumber: ["", [Validators.required]],
      make: ["", [Validators.required]],
      model: ["", [Validators.required]],
      modelYear: ["", [Validators.required]],
      plateType: ["", [Validators.required]],
      ownershipStatus: ["owned", [Validators.required]]
    })
  }

  createTrailer() {
    const trailerFormValue = this.TrailerForm.value;
    const UpdatedTrailerFormValue = {
      ...trailerFormValue,
      VehicleType: 'Trailer',
      VehicleName: `${trailerFormValue.make} ${trailerFormValue.model}`
    }
    this.vehiclestore.addSingleVehicleData(UpdatedTrailerFormValue);
    this.router.navigateByUrl('/fleet-management/vehicles')
  }

  private Fleetfilter(value: string): string[] {

    const filterValue = value.toLowerCase();
    return this.fleetList.filter((option: any) =>
      option.fleetname.toLowerCase().includes(filterValue)
    ).map((option: any) => option.fleetname);
  }

}
