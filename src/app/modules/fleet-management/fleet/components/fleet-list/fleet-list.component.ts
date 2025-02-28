import { ChangeDetectorRef, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AddFleetComponent } from '../add-fleet/add-fleet.component';
import { MatDialog } from '@angular/material/dialog';
import { FleetService } from '../../services/fleet.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { Observable } from 'rxjs';
import { FleetStore } from '../../../store-services/fleet.store';

@Component({
  selector: 'app-fleet-list',
  templateUrl: './fleet-list.component.html',
  styleUrl: './fleet-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FleetListComponent implements OnInit {

  public length!: number;
  public AllFleetsData: any[] = [];
  public FinalDataShow: any[] = [];
  public searchString: string = '';
  public FilterData: any;
  public limit: number = 10;
  public currentPage: number = 1;
  public isDataFound: boolean = true;
  public fleets$!: Observable<any>;
  public searchValue: string = '';
  public dataSource!: MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private _FleetService: FleetService,
    private store: FleetStore,
    private cdRef: ChangeDetectorRef
  ) { }

  displayedColumns = ['Fleet', 'Fleet Manager', 'Trucks', 'Trailers', 'Conainers', 'Action'];

  ngOnInit(): void {
    console.log('9');
    this.store.loadAllFleetManagers();
    this.store.loadAllFleets();
    this.fleets$ = this.store.FleetData$;
    this.fleets$.subscribe((res) => {
      if(res.length != 0) {
        this.UpdateTableData()
      }
    })
    
  }

  public UpdateTableData() {
    this.fleets$.subscribe((AllFleetsDataRes: any) => {
      if (AllFleetsDataRes.length != 0) {
        this.AllFleetsData = AllFleetsDataRes;
        this.length = AllFleetsDataRes.length;
        this.ShowDataAccordingPage();
      }
    })
  }

  public ShowDataAccordingPage() {
    console.log(this.AllFleetsData)
    console.log(this.currentPage, this.limit)
    this.FinalDataShow = this.AllFleetsData.slice((this.currentPage - 1) * this.limit, this.currentPage * this.limit);
    console.log(this.FinalDataShow)
    this.dataSource = new MatTableDataSource(this.FinalDataShow);
    if (this.AllFleetsData.length != 0) {
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

  tableSearching(value: string) {
    console.log(value)
    this.fleets$.subscribe((res: any) => {
      this.AllFleetsData = res;
      console.log(res)
      if (res) {

        this.searchString = value.toLocaleLowerCase().trim().replace(/\s/g, '');
        this.FilterData = this.AllFleetsData.filter((item) => {
          if (item.fleetname.toLowerCase().trim().replace(/\s/g, '').startsWith(this.searchString)) {
            return item;
          }
        })
        console.log(this.FilterData)
        if (value) {
          this.AllFleetsData = this.FilterData;
          this.length = this.FilterData.length;

          this.ShowDataAccordingPage();
        } else {
          this.UpdateTableData()

        }
      }
    })


  }

  createFleet() {
    const dialogRef = this.dialog.open(AddFleetComponent, {
      maxWidth: '100%',
      minWidth: '40%',
      width: '40%',
      autoFocus: false,
      disableClose: true,
      data: {
        editMode: false,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result.api) {
        this.UpdateTableData();
      }
    });
  }

  public editFleet(fleetId: any) {
    const dialogRef = this.dialog.open(AddFleetComponent, {
      maxWidth: '100%',
      minWidth: '40%',
      width: '40%',
      autoFocus: false,
      disableClose: true,
      data: {
        editMode: true,
        editId: fleetId
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result.api) {
        this.UpdateTableData();
      }
    });
  }

  public deleteFleet(deleteId: any) {
    const confirmModelRef = this.dialog.open(ConfirmationComponent, {
      maxWidth: '500px',
      minWidth: '60%',
      width: '500px',
      data: {
        customerId: deleteId
      }
    });
    confirmModelRef.afterClosed().subscribe(result => {
      if (result.api) {
        this.UpdateTableData();
      }
    });
  }

}


