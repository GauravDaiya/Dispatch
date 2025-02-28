import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DriverStore } from '../../../store-services/driver.store';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {

  public delId!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private matDialogRef: MatDialogRef<ConfirmationComponent>,
    public store: DriverStore,
  ) {
    this.delId = data.driverId;
  }

  public DeleteDriver() {
    this.store.deleteSingleDriverData(this.delId);
    const resultData = { api: true }
    this.matDialogRef.close(resultData)
  }

}
