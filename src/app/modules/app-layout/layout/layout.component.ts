import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarHandlerService } from '../../../core/services/sidebar-handler.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  @ViewChild("leftSideNavigation", { static: true })
  public sidenav!: MatSidenav;

  public mobileSideNavTopMargin: number = 100;

  constructor(
    private SidebarHandlerService: SidebarHandlerService,
  ) {}

  ngOnInit(): void {
    this.SidebarHandlerService.leftSideNavigationSetSidenav(this.sidenav);
  }
}
