import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  constructor(private router:Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          // console.log("PAth ", this.router.url)
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
            case "/manageVendor":
              this.routeText="Manage Vendor"
              break;
            case "/manageClient":
              this.routeText="Manage Client"
              break;
            case "/travelBilling":
              this.routeText="Travel Billing"
              break;
            case "/maintenanceReport":
              this.routeText="Maintenance Report"
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
}
