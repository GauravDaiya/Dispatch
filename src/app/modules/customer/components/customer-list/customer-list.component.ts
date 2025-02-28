import { ChangeDetectorRef, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { CustomerService } from '../../services/customer.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { CustomerStore } from '../../store-services/customer.store';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CustomerListComponent implements OnInit {

  public length!: number;
  public AllCustomerData: any[] = [];
  public FinalDataShow: any[] = [];
  public currentPage: number = 1;
  public limit: number = 10;
  public searchString: string = '';
  public customers$!: Observable<any>
  public FilterData: any;
  public isDataFound: boolean = true
  public searchValue: string = '';

  constructor(
    public dialog: MatDialog,
    private store: CustomerStore,
    private cdRef: ChangeDetectorRef
  ) {
   
    console.log('4')
  }

  ngOnInit(): void {
    console.log('5')
    this.store.loadAllCustomers();
    this.customers$ = this.store.CustomerData$;
    this.customers$.subscribe((res) => {
      if(res.length != 0){
        console.log('6')
        this.UpdateTableData()
      }
    })
    
  }

  @HostBinding('class')
  public hostClass = 'app-customer-list';
  public subsink: SubSink = new SubSink();

  

  // table
  public dataSource!: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'fullName',
    'email',
    'businessName',
    'phone',
    'country',
    'state',
    'city',
    'action',
  ];

  tableSearching(value: string) {
    this.customers$.subscribe((res: any) => {
      this.AllCustomerData = res
    })
    this.searchString = value.toLocaleLowerCase().trim().replace(/\s/g, '')
    this.FilterData = this.AllCustomerData.filter((item) => {

      if (item.firstName.toLowerCase().trim().replace(/\s/g, '').startsWith(this.searchString)) {
        return item;
      } else if (item.businessName.toLowerCase().trim().replace(/\s/g, '').includes(this.searchString)) {
        console.log(this.searchString, item)
        return item;
      } else if (item.address.toLowerCase().trim().replace(/\s/g, '').includes(this.searchString)) {
        return item;
      } else if (item.locationphoneNumber.toLowerCase().trim().replace(/\s/g, '').includes(this.searchString)) {
        return item;
      } else if (item.country.toLowerCase().trim().replace(/\s/g, '').includes(this.searchString)) {
        return item;
      } else if (item.state.toLowerCase().trim().replace(/\s/g, '').includes(this.searchString)) {
        return item;
      } else if (item.city.toLowerCase().trim().replace(/\s/g, '').includes(this.searchString)) {
        return item;
      }

    })
    if (value) {
      console.log(value)
      this.AllCustomerData = this.FilterData;
      this.length = this.FilterData.length
      this.ShowDataAccordingPage();
    } else {
      this.UpdateTableData()
    }
  }

  pageRefresh(type: string) {
    this.UpdateTableData();
  }

  paginationChange(event: any) {
    console.log('7')
    this.currentPage = event.currentPage,
      this.limit = event.limit;
    console.log(this.currentPage, this.limit)
    this.ShowDataAccordingPage()
  }

  UpdateTableData() {
    console.log('8')
    this.customers$.subscribe((AllCustomerData) => {
      console.log(AllCustomerData)
      if (AllCustomerData.length) {
        this.AllCustomerData = AllCustomerData
        console.log(AllCustomerData.length)
        this.length = AllCustomerData.length
        this.ShowDataAccordingPage();
      }
    })
    // this.store.select(selectCustomerData).subscribe((CustomerRes:any) => {
    //   if (CustomerRes.length) {
    //     this.AllCustomerData = CustomerRes
    //     this.length = CustomerRes.length
    //     console.log(this.length)
    //     this.ShowDataAccordingPage();
    //   }
    // })
    // this.customerStore.getCustomerData$.subscribe((CustomerRes:any) => {
    //   if (CustomerRes.length) {
    //     this.AllCustomerData = CustomerRes
    //     this.length = CustomerRes.length
    //     console.log(this.length)
    //     this.ShowDataAccordingPage();
    //   }
    // })
    // this._CustomerService.getCustomers().subscribe((CustomerRes: any) => {
    //   if (CustomerRes.length) {

    //     this.AllCustomerData = CustomerRes
    //     this.length = CustomerRes.length
    //     console.log(this.length)
    //     this.ShowDataAccordingPage();
    //   }
    // })
  }



  ShowDataAccordingPage() {
    console.log('9')
    console.log(this.AllCustomerData);
    console.log(this.currentPage,this.limit)
    this.FinalDataShow = this.AllCustomerData.slice((this.currentPage - 1) * this.limit, this.currentPage * this.limit);
    console.log(this.FinalDataShow)
    this.dataSource = new MatTableDataSource(this.FinalDataShow);
    if (this.AllCustomerData.length != 0) {
      this.isDataFound = true;

    } else {
      this.isDataFound = false;
    }
    console.log(this.isDataFound)
    this.cdRef.detectChanges();
    // }
  }

  addCustomer() {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      panelClass: 'custom-dialog-container',
      maxWidth: '100%',
      minWidth: '60%',
      width: '70%',
      disableClose: true,
      data: {
        edit: false,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.api) {
        this.UpdateTableData();
      }
    });
  }
  editCustomer(customerId: any) {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      panelClass: 'custom-dialog-container',
      maxWidth: '100%',
      minWidth: '60%',
      width: '70%',
      data: {
        edit: true,
        customerId: customerId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.api) {
        this.UpdateTableData();
      }
    });
  }

  deleteCustomer(DeletId: any) {
    const confirmModelRef = this.dialog.open(ConfirmationComponent, {
      maxWidth: '500px',
      minWidth: '60%',
      width: '500px',
      data: {
        customerId: DeletId
      }
    });
    confirmModelRef.afterClosed().subscribe(result => {
      if (result.api) {
        this.UpdateTableData();
      }
    });
  }
}
