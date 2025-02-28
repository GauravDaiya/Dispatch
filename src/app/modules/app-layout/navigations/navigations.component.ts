import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html',
  styleUrl: './navigations.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NavigationsComponent {
  constructor(
    public router: Router,
  ) {}
}
