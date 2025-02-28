import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';
import { CustomerStore } from '../../store-services/customer.store';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {

  private delId!: number

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _CustomerService: CustomerService,
    private store: CustomerStore,
    private matDialogRef: MatDialogRef<ConfirmationComponent>,
  ) {
    this.delId = data.customerId;
  }

  DeleteCustomer() {
    this.store.deleteSingleCustomerData(this.delId)
    const resultData = { api: true }
    this.matDialogRef.close(resultData)
    // this._CustomerService.DeleteCustomerService(this.delId).subscribe((delCustomerRes) => {
    //   if (delCustomerRes) {
    //     const resultData = { api: true }
    //     this.matDialogRef.close(resultData)
    //   }
    // })
  }
}
