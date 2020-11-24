import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookRideComponent } from './component/book-ride/book-ride.component';
import { ClientManagementComponent } from './component/client-management/client-management.component';
import { AddCustomerComponent } from './component/customer-list/add-customer/add-customer.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { DriverManagementComponent } from './component/driver-management/driver-management.component';
import { HelpComponent } from './component/help/help.component';
import { MaintanceReportComponent } from './component/maintance-report/maintance-report.component';
import { AddTripComponent } from './component/manage-trip/add-trip/add-trip.component';
import { ManageTripComponent } from './component/manage-trip/manage-trip.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SupportComponent } from './component/support/support.component';
import { TermsAndConditionsComponent } from './component/terms-and-conditions/terms-and-conditions.component';
import { TravellBillingFilterComponent } from './component/travell-billing/travell-billing-filter/travell-billing-filter.component';
import { TravellBillingComponent } from './component/travell-billing/travell-billing.component';
import { VendorManagementComponent } from './component/vendor-management/vendor-management.component';

export const appRoutes: Routes = [
  {path:"profile", component: ProfileComponent},
  {path:"bookride", component: BookRideComponent},
  {path:"managetrip", component: ManageTripComponent},
  {path:"addtrip", component: AddTripComponent},
  {path:"customerList", component: CustomerListComponent},
  {path:"travelerReg", component: AddCustomerComponent},
  {path:"approveMember", component: DriverManagementComponent},
  {path:"manageVendor", component: VendorManagementComponent},
  {path:"manageClient", component: ClientManagementComponent},
  {path:"travelBilling", component: TravellBillingComponent},
  {path:"travelBillingFilters", component: TravellBillingFilterComponent},
  {path:"maintenanceReport", component: MaintanceReportComponent},
  {path:"help", component: HelpComponent},
  {path:"support", component: SupportComponent},
  {path:"terms", component: TermsAndConditionsComponent},
  {path:"privacy", component: PrivacyPolicyComponent},
];

export const sideBarRoutes = [
  { path:"/profile", text:"User Profile", image:"assets/img/car-list.png"},
  { path:"/managetrip", text:"Manage Trip", image:"assets/img/customer-list.png"},
  { path:"/customerList", text:"Traveller List", image:"assets/img/customer-list.png"},
  { path:"/approveMember", text:"Driver Management", image:"assets/img/approveList.png"},
  { path:"/manageVendor", text:"Manage Vendor", image:"assets/img/approveList.png"},
  { path:"/manageClient", text:"Manage Client", image:"assets/img/approveList.png"},
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
