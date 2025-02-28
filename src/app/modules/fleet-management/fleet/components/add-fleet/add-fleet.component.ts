import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { FleetService } from '../../services/fleet.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FleetStore } from '../../../store-services/fleet.store';

@Component({
  selector: 'app-add-fleet',
  templateUrl: './add-fleet.component.html',
  styleUrl: './add-fleet.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddFleetComponent {

  public fleetForm!: FormGroup;
  public fleetManagersList!: any[];
  public fleetMList!: any[]
  public filteredOptions!: Observable<string[]>;
  public fleetReadById$!: Observable<any>
  public isEditMode!: boolean;
  public editId: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _FleetService: FleetService,
    private store: FleetStore,
    private MatDialogRef: MatDialogRef<AddFleetComponent>
  ) {
    this.checkStatus();
    this.editId = this.data.editId;

  }

  ngOnInit() {
    this.createFleetForm()
    if (this.isEditMode) {
      this.store.getFleetDataById(this.editId);
      this.store.FleetDataById$.subscribe((SingleFleetDataRes) => {
        console.log(SingleFleetDataRes);
        this.fleetForm.patchValue({
          name: SingleFleetDataRes.fleetname,
          fleetManagerName: 'Other',
          fleetManager: {
            name: SingleFleetDataRes.fleetManagerName,
            email: SingleFleetDataRes.fleetManagerEmail,
            phone: SingleFleetDataRes.fleetManagerPhone
          }
        })
      })
      // this._FleetService.getSingleFleetData(this.editId).subscribe((SingleFleetDataRes: any) => {
      //   console.log(SingleFleetDataRes)
      //   this.fleetForm.patchValue({
      //     name: SingleFleetDataRes.fleetname,
      //     fleetManagerName: 'Other',
      //     fleetManager: {
      //       name: SingleFleetDataRes.fleetManagerName,
      //       email: SingleFleetDataRes.fleetManagerEmail,
      //       phone: SingleFleetDataRes.fleetManagerPhone
      //     }
      //   })
      // })
    }
    this.store.FleetManagers$.subscribe((fleetManagersListRes: any) => {
      this.fleetManagersList = fleetManagersListRes;
      this.fleetMList = fleetManagersListRes.map((opt: any) => {
        return opt.name
      })
      console.log(this.fleetMList)
      this.filteredOptions = this.fleetForm.controls['fleetManagerName'].valueChanges.pipe(
        startWith(''),
        map(value => {
          if (value == '' || this.fleetMList.includes(value)) {
            return this.fleetMList
          } else {
            console.log('h')
            return this._filter(value || '')
          }
        }),
      );
      console.log(this.filteredOptions)
    })


  }

  public createFleetForm() {
    this.fleetForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      fleetManagerName: [''],
      fleetManager: this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]]
      })
    })
  }

  public createFleet() {
    const fleetFormValue = this.fleetForm.value
    if (this.isEditMode) {
      const fleetData = {
        "fleetname": fleetFormValue.name,
        "fleetManagerName": fleetFormValue.fleetManager.name,
        "fleetManagerEmail": fleetFormValue.fleetManager.email,
        "fleetManagerPhone": fleetFormValue.fleetManager.phone,
        "trucksCount": 0,
        "trailersCount": 0,
        "containersCount": 0
      }

      const editObj = {
        updId: this.editId,
        updFleetData: fleetData
      }

      this.store.updateSingleFleetData(editObj);
      const resultData = { api: true }
      this.MatDialogRef.close(resultData)

      // this._FleetService.EditFleetData(this.editId, fleetData).subscribe((EditFleetRes) => {
      //   if (EditFleetRes) {
      //     const resultData = { api: true }
      //     this.MatDialogRef.close(resultData)
      //   }
      // })

    } else {
      const fleetData = {
        "fleetname": fleetFormValue.name,
        "fleetManagerName": fleetFormValue.fleetManager.name,
        "fleetManagerEmail": fleetFormValue.fleetManager.email,
        "fleetManagerPhone": fleetFormValue.fleetManager.phone,
        "trucksCount": 0,
        "trailersCount": 0,
        "containersCount": 0
      }

      this.store.addSingleFleetData(fleetData);
      if (fleetFormValue.fleetManagerName == 'Other') {
        const fleetManagerData = {
          "name": fleetFormValue.fleetManager.name,
          "email": fleetFormValue.fleetManager.email,
          "phone": fleetFormValue.fleetManager.phone
        }
        this.store.addSingleFleetManager(fleetManagerData);
        const resultData = { api: true }
        this.MatDialogRef.close(resultData)
      } else {
        const resultData = { api: true }
        this.MatDialogRef.close(resultData)
      }

      // this._FleetService.createFleet(fleetData).subscribe((createFleetRes) => {

      //   if (createFleetRes) {
      //     console.log(createFleetRes)
      //     if (fleetFormValue.fleetManagerName == 'Other') {
      //       const fleetManagerData = {
      //         "name": fleetFormValue.fleetManager.name,
      //         "email": fleetFormValue.fleetManager.email,
      //         "phone": fleetFormValue.fleetManager.phone
      //       }
      //       this._FleetService.createFleetMamager(fleetManagerData).subscribe((createFleetManagerRes) => {
      //         if (createFleetManagerRes) {
      //           const resultData = { api: true }
      //           this.MatDialogRef.close(resultData)
      //         }
      //       })
      //     } else {
      //       const resultData = { api: true }
      //       this.MatDialogRef.close(resultData)
      //     }
      //   }
      // })
    }

  }

  public fleetManagerSelection(event: MatAutocompleteSelectedEvent) {
    console.log('change')
    this.fleetForm.get('fleetManager')?.reset();
    this.store.getSingleFleetManager(event.option.value);
    this.store.SingleFleetManager$.subscribe((SingleFleetManagerRes:any) => {
      console.log(SingleFleetManagerRes)
      this.fleetForm.controls['fleetManager'].patchValue(SingleFleetManagerRes[0])
    })
    // this._FleetService.getSinglefleetManager(event.option.value).subscribe((SingleFleetManagerRes: any) => {
    //   console.log(SingleFleetManagerRes)
    //   this.fleetForm.controls['fleetManager'].patchValue(SingleFleetManagerRes[0])
    // })
  }

  private _filter(value: string): string[] {

    const filterValue = value.toLowerCase();
    return this.fleetManagersList.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    ).map((option: any) => option.name);
  }

  checkStatus() {
    this.isEditMode = !!this.data.editMode;
  }

  closeDialog() {
    const resultData = { api: false }
    this.MatDialogRef.close(resultData)
  }

}
