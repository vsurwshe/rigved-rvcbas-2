import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookRideComponent } from './component/book-ride/book-ride.component';
import { AddClientComponent } from './component/client-management/add-client/add-client.component';
import { ClientManagementComponent } from './component/client-management/client-management.component';
import { AddCustomerComponent } from './component/customer-list/add-customer/add-customer.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { AddDriverComponent } from './component/driver-management/add-driver/add-driver.component';
import { DriverManagementComponent } from './component/driver-management/driver-management.component';
import { HelpComponent } from './component/help/help.component';
import { MaintanceDetailsComponent } from './component/maintance-report/maintance-details/maintance-details.component';
import { MaintanceFilterComponent } from './component/maintance-report/maintance-filter/maintance-filter.component';
import { MaintanceReportComponent } from './component/maintance-report/maintance-report.component';
import { AddTripComponent } from './component/manage-trip/add-trip/add-trip.component';
import { ManageTripComponent } from './component/manage-trip/manage-trip.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SupportComponent } from './component/support/support.component';
import { TermsAndConditionsComponent } from './component/terms-and-conditions/terms-and-conditions.component';
import { TravellBillingFilterComponent } from './component/travell-billing/travell-billing-filter/travell-billing-filter.component';
import { TravellBillingComponent } from './component/travell-billing/travell-billing.component';
import { AddVendorComponent } from './component/vendor-management/add-vendor/add-vendor.component';
import { VendorManagementComponent } from './component/vendor-management/vendor-management.component';

export const appRoutes: Routes = [
  { path:"profile", component: ProfileComponent},
  { path:"bookride", component: BookRideComponent},
  { path:"managetrip", component: ManageTripComponent},
  { path:"addtrip", component: AddTripComponent},
  { path:"customerList", component: CustomerListComponent},
  { path:"travelerReg", component: AddCustomerComponent},
  { path:"approveMember", component: DriverManagementComponent},
  { path:"driverReg", component: AddDriverComponent},
  { path:"manageVendor", component: VendorManagementComponent},
  { path:"addVendor", component: AddVendorComponent},
  { path:"manageClient", component: ClientManagementComponent},
  { path:"addClient", component: AddClientComponent},
  { path:"travelBilling", component: TravellBillingComponent},
  { path:"travelBillingFilters", component: TravellBillingFilterComponent},
  { path:"maintenanceReport", component: MaintanceReportComponent},
  { path:"maintenanceReportFilter", component: MaintanceFilterComponent},
  { path:"maintenanceDetaills", component: MaintanceDetailsComponent},
  { path:"help", component: HelpComponent},
  { path:"support", component: SupportComponent},
  { path:"terms", component: TermsAndConditionsComponent},
  { path:"privacy", component: PrivacyPolicyComponent},
];

export const sideBarRoutes = [
  { path:"/profile", text:"User Profile", image:"assets/img/car-list.png"},
  { path:"/managetrip", text:"Manage Trip", image:"assets/img/customer-list.png"},
  { path:"/customerList", text:"Traveller List", image:"assets/img/customer-list.png"},
  { path:"/approveMember", text:"Driver Management", image:"assets/img/approveList.png"},
  { path:"/manageClient", text:"Manage Client", image:"assets/img/approveList.png"},
  { path:"/manageVendor", text:"Manage Vendor", image:"assets/img/approveList.png"},
  { path:"/travelBilling", text:"Travel Billing", image:"assets/img/rupee-indian.png"},
  { path:"/maintenanceReport", text:"Maintenance Report", image:"assets/img/customer-list.png"},
  { path:"/help", text:"Help", image:"assets/img/mobile-phone.png"},
  { path:"/support", text:"Support", image:"assets/img/support.png"},
  { path:"/terms", text:"Terms & Conditions", image:"assets/img/clipboard-and-notebook.png"},
  { path:"/privacy", text:"Privacy Policy", image:"assets/img/approveList.png"}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
