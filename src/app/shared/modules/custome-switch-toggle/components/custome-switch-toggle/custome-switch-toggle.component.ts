import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-custome-switch-toggle',
  templateUrl: './custome-switch-toggle.component.html',
  styleUrl: './custome-switch-toggle.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CustomeSwitchToggleComponent implements OnInit {

  @Input() status !: String;
  @Input() toggleId!: number;
  @Output() changedStatusData: EventEmitter<object> = new EventEmitter()
  isChecked: boolean = true;

  constructor() { }

  ngOnInit(): void {
    if (this.status == 'active') {
      this.isChecked = true;

    } else {
      this.isChecked = false
    }

  }

  public ChangeStatus(event: any) {

    if (this.status == 'active') {

      this.status = 'inactive'
    } else {

      this.status = 'active'
    }

    const statusObj = {
      id: this.toggleId,
      status: this.status
    }
    setTimeout(() => {
      this.changedStatusData.emit(statusObj)
    }, 250)

    console.log(this.isChecked, statusObj)
  }

  setStatus() {
    const statusObj = {
      id: this.toggleId,
      status: 'active'
    }

    this.changedStatusData.emit(statusObj)

  }

}
