import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DriverStore } from '../../../store-services/driver.store';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DriverListComponent implements OnInit {

  public length!: number;
  public AllDriversData: any[] = [];
  public FinalDataShow: any[] = [];
  public searchString: string = '';
  public FilterData: any;
  public limit: number = 10;
  public currentPage: number = 1;
  public isDataFound: boolean = true;
  public Drivers$!: Observable<any>;
  public searchValue: string = '';
  public dataSource!: MatTableDataSource<any>;

  displayedColumns = ['Name', 'Email', 'Phone', 'Status', 'Action'];

  constructor(
    public dialog: MatDialog,
    public store: DriverStore,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.store.loadAllDrivers();
    this.Drivers$ = this.store.Drivers$;
    this.Drivers$.subscribe((res) => {
      if (res.length != 0) {
        this.UpdateTableData()
      }
    })
  }

  public UpdateTableData() {
    this.Drivers$.subscribe((AllDriversDataRes: any) => {
      if (AllDriversDataRes.length != 0) {
        this.AllDriversData = AllDriversDataRes;
        this.length = AllDriversDataRes.length;
        this.ShowDataAccordingPage();
      }
    })
  }

  public ShowDataAccordingPage() {

    console.log(this.currentPage, this.limit)
    this.FinalDataShow = this.AllDriversData.slice((this.currentPage - 1) * this.limit, this.currentPage * this.limit);
    console.log(this.FinalDataShow)
    this.dataSource = new MatTableDataSource(this.FinalDataShow);
    if (this.AllDriversData.length != 0) {
      this.isDataFound = true;

    } else {
      this.isDataFound = false;
    }
    this.cdRef.detectChanges();
  }

  public paginationChange(event: any) {
    this.currentPage = event.currentPage,
      this.limit = event.limit;
    console.log(this.currentPage, this.limit)
    this.ShowDataAccordingPage();
    
  }

  pageRefresh(type: string) {
    this.UpdateTableData();
  }

  public tableSearching(value: string) {
    this.Drivers$.subscribe((res:any) => {
      this.AllDriversData = res;
      if(res) {
        this.searchString = value.toLocaleLowerCase().trim().replace(/\s/g, '');
        this.FilterData = this.AllDriversData.filter((item) => {
          if (item.name.toLowerCase().trim().replace(/\s/g, '').startsWith(this.searchString)) {
            return item;
          }
        })
        if (value) {
          this.AllDriversData = this.FilterData;
          this.length = this.FilterData.length;

          this.ShowDataAccordingPage();
        } else {
          this.UpdateTableData()

        }
      }
    })
  }

  public DeleteDriver(deleteId: any) {
    const confirmModelRef = this.dialog.open(ConfirmationComponent, {
      maxWidth: '500px',
      minWidth: '60%',
      width: '500px',
      data: {
        driverId: deleteId
      }
    });
    confirmModelRef.afterClosed().subscribe(result => {
      if (result.api) {
        this.UpdateTableData();
      }
    });
  }

  public UpdateStatus(event: any) {
    const editObj = {
      updId: event.id,
      updStatus: event.status
    }
    this.store.updateSingleDriverStatus(editObj)
    
    console.log(event)
  }

}
