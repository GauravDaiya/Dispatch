import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DriverStore } from '../../../store-services/driver.store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrl: './create-driver.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CreateDriverComponent implements OnInit {

  public DriverForm!: FormGroup;
  public editId: any = '';
  public editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public store: DriverStore,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.createDriverForm();
    this.editId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.editId) {
      this.editMode = true;
      this.store.getDriverDataById(this.editId);
      this.store.DriverDataById$.subscribe((DriverDataRes) => {
        console.log(DriverDataRes);
        this.DriverForm.patchValue(DriverDataRes);
      })
    }
    // console.log(this.editId)
  }

  public createDriverForm() {
    this.DriverForm = this.formBuilder.group({
      "name": ["", [Validators.required]],
      "email": ["", [Validators.required, Validators.email]],
      "phone": ["", [Validators.required]],
      "status": ["invite"]
    })
  }

  public createDriver() {
    console.log(this.DriverForm.value);
    if(this.editMode) {
      const editObj = {
        updId: this.editId,
        updDriverData: this.DriverForm.value
      }
      console.log(editObj)
      this.store.updateSingleDriverData(editObj);
    } else {
      this.store.addSingleDriverData(this.DriverForm.value);
    }
    
    this.router.navigateByUrl('/fleet-management/drivers')
  }
}
