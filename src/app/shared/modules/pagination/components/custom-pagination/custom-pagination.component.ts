import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../../../../../modules/customer/services/customer.service';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrl: './custom-pagination.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CustomPaginationComponent implements OnInit {
  @Input()
  public length!: number; // Total Records count from api key (total)
  // @Input()
  public pageSizeOptions: number[]; // Per page limit dropdown options
  // @Input()
  public pageSize: number; // Per page records size like per page 10 records
  @Input()
  public totalRecords!: number; // Total recors for grand total 
  @Input()
  public moduleName!: string; // Module name
  // @Input()
  public pageIndex: number = 1; // Page index or page number
  // @Input()
  // public paginator: any;

  @Output()
  public change: EventEmitter<any> = new EventEmitter<any>();

  public pagination: { first?: any; last?: any; pages?: any[]; };
  // public previousPageIndex: number;
  public totalPages: any;
  public pagesLength :number = 0;
  
  constructor(
    private _CustomerService: CustomerService,

  ) {
    console.log('10')
    this.pageSizeOptions = [10,25,50,100];
    this.pagination = {};
    this.pageIndex = 1;
 
    this.pageSize = 10;
  }
  ngOnInit(): void {
      console.log('11')
  }

 
  ngOnChanges(): void {
    console.log('12')

    this.initialPaginations();
  }
  private initialPaginations():void {
    console.log('13')
   console.log(this.length,this.pageIndex)
    this.pagination.pages = [];
    this.totalPages = Math.ceil((this.length ) / this.pageSize); // 50/10 = 5 page
    for(let i = 1 ; i <= this.totalPages ; i++) {
      this.pagination.pages.push(i)
    }
    this.pagination.first = ( this.pageIndex > 1 ) ? true : false;
    this.pagination.last = ( this.pageIndex < this.totalPages ) ? true : false;
    console.log(this.pagination.pages)
    if(!(this.pagination.pages.includes(this.pageIndex) || this.length == undefined || this.length == 0)) {
     console.log('hh')
      this.pageIndex = this.pagination.pages[this.pagination.pages.length - 1];
      this.change.emit({
        currentPage : this.pageIndex,
        limit : this.pageSize
      })
    }
    this.pagesLength = this.pagination.pages.length;
    
  }

  public pageSizeOptionChageE(event:any): void {
    this.pageSize = event.value;
    this.pageIndex = 1; 
    this.change.emit({
      currentPage : this.pageIndex,
      limit : this.pageSize
    })
    this.initialPaginations()
  }

  pageChange(page:any) {
    console.log('14')
    this.pageIndex = page;
    this.change.emit({
      currentPage : this.pageIndex,
      limit : this.pageSize
    })
    this.initialPaginations();
  }
}
