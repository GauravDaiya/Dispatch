import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';
import { MessagesUtil } from '../../../../core/utils/message.util';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { addCustomerData } from '../../../../store/state.actions';
import { CustomerStore } from '../../store-services/customer.store';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent implements OnInit {

  public customerform !: FormGroup;
  public isEditMode!: boolean;
  private customerId: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public messages: MessagesUtil,
    private MatDialogRef: MatDialogRef<AddCustomerComponent>,
    private formBuilder: FormBuilder,
    private store: CustomerStore,
    private _CustomerService: CustomerService,
    // private store:Store<AppState>
  ) {
    this.checkStatus();
    this.customerId = this.data.customerId;
  }
  ngOnInit(): void {

    this.createCustomerForm();
    if (this.customerId) {
      this._CustomerService.getCustomerReadByIdService(this.customerId).subscribe((customerData) => {
        this.customerform.patchValue(customerData)
      })
    }
    this.subscribeToCustomerSameContact()
  }

  createCustomerForm() {
    this.customerform = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      customerCompanyName: [''],
      businessName: ['', [Validators.required]],
      accountNumber: [''],
      ein: [''],
      address: ['', [Validators.email, Validators.required]],
      typeB: ['business'],
      phoneNumber: ['', [Validators.required]],
      ext: [''],
      countryCallingCode: ['+1'],
      typeM: ['mobile'],
      tagIds: [[]],
      tagSearch: [''],
      isCustomerSameContact: [false],
      notes: ['', [Validators.maxLength(250)]],
      locationFirstName: ['', [Validators.required]],
      locationLastName: [''],
      locationphoneNumber: [''],
      locationext: ['', Validators.maxLength(4)],
      locationtype: ['mobile'],
      locationRadiotype: ['residential'],
      searchlocation: [''],
      searchaddress: ['', [Validators.required]],
      neighborhood: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      country: ['', [Validators.required]],
    })
  }

  formSubmit() {
    const customerFormValue = this.customerform.value;
    if (this.isEditMode) {
      if (this.customerform.invalid) return;
      const editObj = {
        updId : this.customerId,
        updCustomerData : customerFormValue
      }
      this.store.updateSingleCustomerData(editObj)
      const resultData = { api: true}
      this.MatDialogRef.close(resultData);
      // this._CustomerService.editCustomer(this.customerId,customerFormValue).subscribe((EditCustomerRes) => {
      //   if(EditCustomerRes) {
      //     const resultData = { api: true, data: EditCustomerRes}
      //     this.MatDialogRef.close(resultData);
      //   }
      // })
    } else {
      if (this.customerform.invalid) return;
      // console.log(this.customerform)
      // this.store.dispatch(addCustomerData(customerFormValue))
      // this.customerStore.addSingleCustomerData(customerFormValue).subscribe((AddSingleCustomerRes) => {
      //   if(AddSingleCustomerRes) {
      //     const resultData = { api: true, data: AddSingleCustomerRes }
      //     this.MatDialogRef.close(resultData);
      //   }
      // })
      this.store.addSingleCustomerData(customerFormValue);
      const resultData = { api: true }
      this.MatDialogRef.close(resultData);
      
      // this._CustomerService.createCustomer(customerFormValue).subscribe((AddCustomerRes) => {
      //   if (AddCustomerRes) {
      //     const resultData = { api: true, data: AddCustomerRes }
      //     this.MatDialogRef.close(resultData);
      //   }
      // })
    }

  }

  subscribeToCustomerSameContact() {
    this.customerform.controls['isCustomerSameContact'].valueChanges.subscribe((isCustomerSameContact) => {
      if(isCustomerSameContact) {
        this.customerform.controls['locationFirstName'].setValue(this.customerform.get('firstName')?.value) ;
        this.customerform.controls['locationphoneNumber'].setValue(this.customerform.get('phoneNumber')?.value)
      } else {
        this.customerform.controls['locationFirstName'].setValue('');
        this.customerform.controls['locationphoneNumber'].setValue('')
      }
    })
  }

  checkStatus() {
    this.isEditMode = !!this.data.edit;
  }

  closeDialog() {
    const resultData = { api: false }
    this.MatDialogRef.close(resultData);
  }
}
