import { Component, OnInit } from '@angular/core';
declare var $: any;
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
  // this varible for declaring the array
  routesArray;
  constructor() {
    
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('#sidebarCollapse1,#sidebarCollapse2, #hideButton').on('click', function () {
        $('#sidebar1, #content').toggleClass('active');
        $('.overlay').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      });
    });
   
  }

  

}
