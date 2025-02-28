import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
	providedIn: 'root'
})
export class SidebarHandlerService {

	public sidenav: MatSidenav;

	constructor() {
		this.sidenav = MatSidenav as any;
	}

	public leftSideNavigationSetSidenav(sidenav: MatSidenav) {
		this.sidenav = sidenav;
	}

	public leftSideNavigationOpen() {
		return this.sidenav.open();
	}
	public leftSideNavigationClose() {
		return this.sidenav.close();
	}
	public leftSideNavigationToggle(): void {
		this.sidenav.toggle();
	}
}
