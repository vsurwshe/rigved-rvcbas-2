import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  //  required variables
  loading;
  travellerFrom: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customerService:CustomerService,
    private loginService:LoginService,
    private router:Router
  ){  this.loading=false; }

  ngOnInit(): void {
    this.travellerFrom= this.formBuilder.group({
      'emailId': new FormControl(),
      'mobileNumber': new FormControl(),
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'secMobileNumber': new FormControl()
    })
  }

  registerTraveller(){
    const { value, status }=this.travellerFrom
    if(status =="VALID"){
      this.loading=true;
      this.customerService.saveCustomer(value)
      .subscribe(
        response=> {
          this.loading=false
          this.loginService.successFullMessage("Traveller Registered Successfully ..!");
          this.router.navigateByUrl("/customerList");
        },
        error=>{ 
          this.loading=false;
          this.loginService.errorMessage("Something went wrong....,Please try again.....!");
      })
    }
  }
}
