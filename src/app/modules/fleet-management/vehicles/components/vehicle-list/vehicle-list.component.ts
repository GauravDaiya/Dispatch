import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { VehicleStore } from '../../../store-services/vehicle.store';
import { FormControl } from '@angular/forms';
import { FleetStore } from '../../../store-services/fleet.store';
import { FuelTypeStore } from '../../../store-services/fuelType.store';
import { PlateTypeStore } from '../../../store-services/plateType.store';
import { MatSelectionList } from '@angular/material/list';
import { MatRadioDefaultOptions, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class VehicleListComponent implements OnInit {

  @ViewChild('vehicleTypeSelect') vehicleTypeSelect !: MatSelectionList;
  @ViewChild('fleetSelect') fleetSelect !: MatSelectionList;
  @ViewChild('fuelTypeSelect') fuelTypeSelect !: MatSelectionList;
  @ViewChild('plateTypeSelect') plateTypeSelect !: MatSelectionList;
  @ViewChild('ownerShipStatusOptionSelect') ownerShipStatusOptionSelect !: MatRadioGroup;

  public isOpened: boolean = true;
  public hasActiveFilter = false;
  public searchString: string = '';
  public searchValue: string = '';
  public length!: number;
  public AllVehiclesData: any[] = [];
  public FinalDataShow: any[] = [];
  public FilterData: any;
  public limit: number = 10;
  public TruckCount!: number;
  public TrailerCount!: number;
  public ContainerCount!: number;
  public currentPage: number = 1;
  public isDataFound: boolean = true;
  public VehicleList$!: Observable<any>;
  public dataSource!: MatTableDataSource<any>;
  public fleetList!: any[];
  public fleetNameList!: any[];
  public fuelTypes!: any[];
  public plateTypes!: any[];
  public AllFilterVehiclesData!: any[];
  public FinalFilterArray: any[] = [];
  public FinalFilterObj: any = {};
  public selectedOwnershipStatus!: null;

  constructor(
    private vehiclestore: VehicleStore,
    private cdRef: ChangeDetectorRef,
    private Fleetstore: FleetStore,
    private fueltypestore: FuelTypeStore,
    private platetypestore: PlateTypeStore,
  ) {
  }

  displayedColumns = ['Name', 'Fleet', 'Unit Number', 'Modal Year', 'Operational Status'];

  ngOnInit(): void {
    this.Fleetstore.loadAllFleets();
    this.fueltypestore.loadFuelType();
    
    this.platetypestore.loadPlateType();
    this.VehicleList$ = this.vehiclestore.VehicleList$;
    this.VehicleList$.subscribe((res) => {
      if (res.length != 0) {
        this.TruckCount = 0;
        this.TrailerCount = 0;
        this.ContainerCount = 0;
        res.map((item: any) => {
          if (item.VehicleType == 'Truck') {
            console.log(this.TrailerCount)
            this.TruckCount += 1;
            console.log('t')
          } else if (item.VehicleType == 'Trailer') {
            this.TrailerCount += 1;
          } else {
            this.ContainerCount += 1;
          }
        })
        this.UpdateTableData()
      } else {
        
        this.vehiclestore.loadVehicles();
      }

      console.log(this.TrailerCount)
    });
    this.Fleetstore.FleetData$.subscribe((fleetListRes: any) => {
      this.fleetList = fleetListRes;
      console.log(this.fleetList)
      this.fleetNameList = fleetListRes.map((opt: any) => {
        return opt.fleetname
      })
      console.log(this.fleetNameList)
    });
    this.fueltypestore.FuelTypeList$.subscribe((FuelListRes) => {
      this.fuelTypes = FuelListRes.map((opt: any) => {
        return opt.fuelName
      });
      console.log(this.fuelTypes)
    });
    this.platetypestore.PlateTypeList$.subscribe((PlateListRes) => {
      this.plateTypes = PlateListRes.map((opt: any) => {
        return opt.plateName
      });
      console.log(this.plateTypes)
    })
  }

  public onVehicleTypeChange(event: any) {
    const selectedOptions = event.source.selectedOptions.selected.map((option: any) => option.value)
    this.FinalFilterObj['VehicleType'] = selectedOptions;
    this.hasActiveFilter = true;
  }

  public onFleetChange(event: any) {
    const selectedOptions = event.source.selectedOptions.selected.map((option: any) => option.value);
    this.FinalFilterObj['searchFleet'] = selectedOptions;
    this.hasActiveFilter = true;
  }

  public onFuelTypeChange(event: any) {
    const selectedOptions = event.source.selectedOptions.selected.map((option: any) => option.value);
    this.FinalFilterObj['fuelType'] = selectedOptions;
    this.hasActiveFilter = true;
  }

  public onPlateTypeChange(event: any) {
    const selectedOptions = event.source.selectedOptions.selected.map((option: any) => option.value);
    this.FinalFilterObj['plateType'] = selectedOptions;
    this.hasActiveFilter = true;
  }

  public onOwnershipStatus(event: any) {
    this.FinalFilterObj['ownershipStatus'] = [event.value];
    this.hasActiveFilter = true;
  }

  public clearAllFilters() {
    this.searchValue = '';
    this.vehicleTypeSelect._items.forEach((el) => {
      el.selected = false
      console.log(el.selected)
    })

    this.fleetSelect._items.forEach((el) => {
      el.selected = false
      console.log(el.selected)
    })

    this.plateTypeSelect._items.forEach((el) => {
      el.selected = false
      console.log(el.selected)
    })

    this.fuelTypeSelect._items.forEach((el) => {
      el.selected = false
      console.log(el.selected)
    })

    this.ownerShipStatusOptionSelect.value = null;

    this.selectedOwnershipStatus = null;

    this.FinalFilterObj = {};

    this.hasActiveFilter = false;

    this.UpdateTableData()

  }

  public UpdateTableData() {
    this.VehicleList$.subscribe((AllVehiclesDataRes: any) => {
      if (AllVehiclesDataRes.length != 0) {
        this.AllVehiclesData = AllVehiclesDataRes;
        this.length = AllVehiclesDataRes.length;
        this.ShowDataAccordingPage();
      }
    })
  }

  public ShowDataAccordingPage() {
    console.log(this.AllVehiclesData)
    console.log(this.currentPage, this.limit)
    this.FinalDataShow = this.AllVehiclesData.slice((this.currentPage - 1) * this.limit, this.currentPage * this.limit);
    console.log(this.FinalDataShow)
    this.dataSource = new MatTableDataSource(this.FinalDataShow);
    if (this.AllVehiclesData.length != 0) {
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

  public toggleSideBar() {
    this.isOpened = !this.isOpened;
    console.log(this.isOpened)
  }

  public tableSearching(value: string) {
    this.VehicleList$.subscribe((res: any) => {
      this.AllVehiclesData = res;
      if (res) {
        this.searchString = value.toLocaleLowerCase().trim().replace(/\s/g, '');
        this.FilterData = this.AllVehiclesData.filter((item) => {
          if (item.VehicleName.toLowerCase().trim().replace(/\s/g, '').startsWith(this.searchString)) {
            return item;
          }
        })
        if (value) {
          this.AllVehiclesData = this.FilterData;
          this.length = this.FilterData.length;

          this.ShowDataAccordingPage();
        } else {
          this.UpdateTableData()
        }
      }
    })
  }

  public ApplyFilter() {
    this.searchValue = '';
    console.log(this.FinalFilterObj)
    this.VehicleList$.subscribe((AllVehiclesDataRes: any) => {
      this.AllFilterVehiclesData = AllVehiclesDataRes;
    })
    this.FinalFilterArray = [];
    for (let x in this.FinalFilterObj) {
      this.FinalFilterObj[x].forEach((element: any) => {
        console.log(element);
        console.log(this.AllFilterVehiclesData)
        const FilterObj = this.AllFilterVehiclesData.filter((el: any) => {
          // console.log(el[x])
          if (el[x] == element) {
            return el;
          }
        })
        this.FinalFilterArray = [...this.FinalFilterArray, FilterObj]
      });
      if (this.FinalFilterObj[x].length != 0) {
        this.AllFilterVehiclesData = this.FinalFilterArray.flat();
        this.FinalFilterArray = [];
      }

      console.log(this.AllFilterVehiclesData)
    }
    this.FinalFilterArray = this.AllFilterVehiclesData;
    this.AllVehiclesData = this.FinalFilterArray;
    this.length = this.AllVehiclesData.length;
    this.ShowDataAccordingPage()
    console.log(this.FinalFilterArray)
  }
}
