import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarHandlerService } from '../../../core/services/sidebar-handler.service';
import { DeviceDetectService } from '../../../core/services/device-detect.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {

  public toggleActive:boolean = false;
  constructor(
    public SidebarHandlerService: SidebarHandlerService,
    public readonly DeviceDetectService: DeviceDetectService
  ) {  
    
  }

  toggleRightSidenav() {
    this.toggleActive = !this.toggleActive;
    this.SidebarHandlerService.leftSideNavigationToggle();
  }

}
