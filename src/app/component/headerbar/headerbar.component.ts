import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { TravellBillingFilterComponent } from '../travell-billing/travell-billing-filter/travell-billing-filter.component';
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
  travellerList;
  routeText="";
  // this varible for dseclaring the array
  routesArray;
  constructor(private router:Router) {
    this.travelBilling=false;
    this.travelBillingFilter=false;
  }

  ngOnInit(): void {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          console.log("PAth ", this.router.url)
          switch (this.router.url) {
            case "/profile":
              this.routeText="Manage Profile"
              break;
            case "/bookride":
              this.routeText="Booking Rides"
              break;
            case "/managetrip":
              this.routeText="Manage Trip"
              break;
            case "/addtrip":
              this.routeText="Add Trip"
              break;
            case "/customerList":
              this.routeText="Customer List";
              this.travellerList = true;
              break;
            case "/travelerReg":
              this.routeText="Register Traveller"
              break;
            case "/approveMember":
              this.routeText="Approve Member"
              break;
            case "/driverReg":
              this.routeText="Register Driver"
              break;
            case "/manageVendor":
              this.routeText="Manage Vendor"
              break;
            case "/addVendor":
              this.routeText="Add Vendor"
              break;
            case "/manageClient":
              this.routeText="Manage Client"
              break;
            case "/addClient":
              this.routeText="Add Client"
              break;
            case "/travelBilling":
              this.travelBilling=true;
              this.travelBillingFilter=false;
              this.maintenanceReport=false;
              this.routeText="Travel Billing"
              break;
            case "/travelBillingFilters":
              this.travelBillingFilter=true;
              this.maintanceReportFilter=false;
              this.routeText="Travell Billing Filters"
              break;
            case "/maintenanceReport":
              this.maintenanceReport=true;
              this.travelBilling=false;
              this.routeText="Maintenance Report"
              break;
            case "/maintenanceReportFilter":
              this.maintenanceReport=false;
              this.travelBilling=false;
              this.routeText="Maintenance Report Filter"
              break;
            case "/maintenanceDetaills":
              this.maintenanceReport=false;
              this.travelBilling=false;
              this.routeText="Maintenance Details by Driver";
              break;
            case "/help":
              this.routeText="Help"
              break;
            case "/support":
              this.routeText="Support"
              break;
            case "/terms":
              this.routeText="Terms And Conditions"
              break;
            case "/privacy":
              this.routeText="Privacy Policy"
              break;
            default:
              this.routeText=""
          }
        }
      }
    );
    $(document).ready(function () {
      $('#sidebarCollapse1,#sidebarCollapse2, #hideButton').on('click', function () {
        $('#sidebar1, #content').toggleClass('active');
        $('.overlay').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      });
    });
   
  }

  filtersApply(){
    // new TravellBillingFilterComponent().filtersApply();
  }
}
