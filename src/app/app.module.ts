import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { HeaderbarComponent } from './component/headerbar/headerbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorviewComponent } from './utils/errorview/errorview.component';
import { ManageTripComponent } from './component/manage-trip/manage-trip.component';
import { BookRideComponent } from './component/book-ride/book-ride.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { DriverManagementComponent } from './component/driver-management/driver-management.component';
import { VendorManagementComponent } from './component/vendor-management/vendor-management.component';
import { ClientManagementComponent } from './component/client-management/client-management.component';
import { TravellBillingComponent } from './component/travell-billing/travell-billing.component';
import { MaintanceReportComponent } from './component/maintance-report/maintance-report.component';
import { HelpComponent } from './component/help/help.component';
import { SupportComponent } from './component/support/support.component';
import { TermsAndConditionsComponent } from './component/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { LoginService } from './service/login.service';
import { AuthService } from './service/auth.service';
import { LoginComponent } from './component/login/login.component';
import { LoginNavbarComponent } from './component/login/login-navbar/login-navbar.component';
import { LoginFooterComponent } from './component/login/login-footer/login-footer.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageTripService } from './service/manage-trip.service';
import { MasterDataService } from './service/master-data.service';
import { BookingService } from './service/booking.service'
import { DataTableService } from './service/data-table.service'
import { CustomerService } from './service/customer.service'
import { BillService } from './service/bill.service'
import { DataTablesModule } from 'angular-datatables';
import { FileService } from './service/file.service'
import { DriverService } from './service/driver.service'
import { ExpenditureService} from './service/expenditure.service'
import { AddTripComponent } from './component/manage-trip/add-trip/add-trip.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCustomerComponent } from './component/customer-list/add-customer/add-customer.component';
import { TravellBillingFilterComponent } from './component/travell-billing/travell-billing-filter/travell-billing-filter.component';
import { AddDriverComponent } from './component/driver-management/add-driver/add-driver.component';
import { AddVendorComponent } from './component/vendor-management/add-vendor/add-vendor.component';
import { AddClientComponent } from './component/client-management/add-client/add-client.component';
import { MaintanceFilterComponent } from './component/maintance-report/maintance-filter/maintance-filter.component';
import { MaintanceDetailsComponent } from './component/maintance-report/maintance-details/maintance-details.component';
import { AddMaintanceBillComponent } from './component/maintance-report/add-maintance-bill/add-maintance-bill.component';
import { ForgotPasswordComponent } from './component/login/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderbarComponent,
    ErrorviewComponent,
    ManageTripComponent,
    BookRideComponent,
    ProfileComponent,
    CustomerListComponent,
    DriverManagementComponent,
    VendorManagementComponent,
    ClientManagementComponent,
    TravellBillingComponent,
    MaintanceReportComponent,
    HelpComponent,
    SupportComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    LoginComponent,
    LoginNavbarComponent,
    LoginFooterComponent,
    AddTripComponent,
    AddCustomerComponent,
    TravellBillingFilterComponent,
    AddDriverComponent,
    AddVendorComponent,
    AddClientComponent,
    MaintanceFilterComponent,
    MaintanceDetailsComponent,
    AddMaintanceBillComponent,
    ForgotPasswordComponent 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule  
  ],
  providers: [
    LoginService,
    AuthService,
    ManageTripService,
    MasterDataService,
    BookingService,
    DataTableService,
    CustomerService,
    BillService,
    FileService,
    DriverService,
    ExpenditureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
