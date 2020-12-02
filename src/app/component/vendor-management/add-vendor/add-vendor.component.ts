import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {

  // required variables
  loading;
  constructor() { this.loading=false; }

  ngOnInit(): void {
  }

}
