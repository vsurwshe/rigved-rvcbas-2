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
import { LoginService } from './service/login.service'
import { AuthService } from './service/auth.service';
import { LoginComponent } from './component/login/login.component';
import { LoginNavbarComponent } from './component/login-navbar/login-navbar.component';
import { LoginFooterComponent } from './component/login-footer/login-footer.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageTripService } from './service/manage-trip.service';
import { MasterDataService } from './service/master-data.service';
import { BookingService } from './service/booking.service'
import { DataTablesModule } from 'angular-datatables';
import {RatingModule} from 'primeng/rating';
import { AddTripComponent } from './component/manage-trip/add-trip/add-trip.component';

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
    AddTripComponent 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    RatingModule  
  ],
  providers: [
    LoginService,
    AuthService,
    ManageTripService,
    MasterDataService,
    BookingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
