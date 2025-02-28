import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { MaterialModule } from '../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { PaginationModule } from '../../shared/modules/pagination/pagination.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MessagesUtil } from '../../core/utils/message.util';
import { CustomerStore } from './store-services/customer.store';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DirectivesModule } from '../../shared/directives/directives.module';


@NgModule({
  declarations: [
    CustomerListComponent,
    AddCustomerComponent,
    ConfirmationComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    PipesModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    PaginationModule,
    NgxMaskDirective,
    NgxMaskPipe,
    DirectivesModule
  ],
  providers: [
    MessagesUtil,
    CustomerStore,
    provideNgxMask(),
  ]
})
export class CustomerModule { }
