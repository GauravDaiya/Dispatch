import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { FleetStore } from '../../../store-services/fleet.store';
import { VehicleStore } from '../../../store-services/vehicle.store';

@Component({
  selector: 'app-create-container',
  templateUrl: './create-container.component.html',
  styleUrl: './create-container.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CreateContainerComponent implements OnInit {

  public ContainerForm!: FormGroup;
  public editId: any = '';
  public editMode: boolean = false;
  public filteredFleetOptions!: Observable<string[]>;
  public fleetList!: any[];
  public fleetNameList!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private Fleetstore: FleetStore,
    private vehiclestore: VehicleStore
  ) {}

  ngOnInit(): void {
    this.createContainerForm();
    this.Fleetstore.loadAllFleets();
    this.Fleetstore.FleetData$.subscribe((fleetListRes: any) => {
      this.fleetList = fleetListRes;
      console.log(fleetListRes)
      this.fleetNameList = fleetListRes.map((opt: any) => {
        return opt.fleetname
      })
      console.log(this.fleetNameList);
      this.filteredFleetOptions = this.ContainerForm.controls['searchFleet'].valueChanges.pipe(
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
  }

  public createContainerForm() {
    this.ContainerForm = this.formBuilder.group({
      operationalStatus: ["active", [Validators.required]],
      searchFleet: ["", [Validators.required]],
      unitNumber: ["", [Validators.required]],
      make: ["", [Validators.required]],
      model: ["", [Validators.required]],
      modelYear: ["", [Validators.required]],
      ownershipStatus: ["owned", [Validators.required]]
    })
  }

  createContainer() {
    const containerFormValue = this.ContainerForm.value;
    const UpdatedContainerFormValue = {
      ...containerFormValue,
      VehicleType: 'Container',
      VehicleName: `${containerFormValue.make} ${containerFormValue.model}`
    }
    this.vehiclestore.addSingleVehicleData(UpdatedContainerFormValue);
    this.router.navigateByUrl('/fleet-management/vehicles')
  }

  private Fleetfilter(value: string): string[] {

    const filterValue = value.toLowerCase();
    return this.fleetList.filter((option: any) =>
      option.fleetname.toLowerCase().includes(filterValue)
    ).map((option: any) => option.fleetname);
  }

}
