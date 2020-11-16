import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss']
})
export class HeaderbarComponent implements OnInit {

  travelBilling;
  maintenanceReport;
  travelBillingFilter;
  maintanceReportFilter;

  constructor() { }

  ngOnInit(): void {
  }

  

}
