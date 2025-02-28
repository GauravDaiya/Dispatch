import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FleetService } from '../../services/fleet.service';
import { FleetStore } from '../../../store-services/fleet.store';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {

  public delId!: number

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _FleetService: FleetService,
    private store: FleetStore,
    private matDialogRef: MatDialogRef<ConfirmationComponent>,
  ) {
    this.delId = data.customerId
  }

  DeleteFleet() {
    this.store.deleteSingleFleetData(this.delId);
    const resultData = { api: true }
    this.matDialogRef.close(resultData)
    // this._FleetService.DeleteFleetData(this.delId).subscribe((DeleteFleetDataRes: any) => {
    //   if (DeleteFleetDataRes) {
    //     const resultData = { api: true }
    //     this.matDialogRef.close(resultData)
    //   }
    // })
  }
}
