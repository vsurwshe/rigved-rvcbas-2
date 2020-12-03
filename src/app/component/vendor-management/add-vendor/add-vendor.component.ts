import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { MasterDataService } from 'src/app/service/master-data.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {

  // required variables
  loading;

  vendorManagementForm: FormGroup;
  constructor( 
    private formBuilder: FormBuilder, 
    private masterData:MasterDataService,
    private loginService: LoginService,
    private router: Router
  ) { this.loading=false; }

  ngOnInit(): void {
    this.vendorManagementForm= this.formBuilder.group({
      'companyName': new FormControl(),
      'address': new FormControl(),
      'city': new FormControl(),
      'gstnumber': new FormControl(),
      'state': new FormControl(),
      'pincode': new FormControl(),
      'contactPersonDtoList': this.formBuilder.group({
        'firstName': new FormControl(),
        'lastName': new FormControl(),
        'emailId': new FormControl(),
        'mobileNumber': new FormControl()
      })
    })
  }

  addVendorDetails(){
    if(this.vendorManagementForm.status == "VALID"){
      let modifyBodyData={
        'companyName':this.vendorManagementForm.get("companyName").value,
        'city':this.vendorManagementForm.get("city").value,
        'gstnumber':this.vendorManagementForm.get("gstnumber").value,
        'state':this.vendorManagementForm.get("state").value,
        'pincode':this.vendorManagementForm.get("pincode").value,
        'contactPersonDtoList': [this.getVendorContactPersonDetails]
      }
      console.log("Body Data ", modifyBodyData)
      this.loading=true;
      this.masterData.saveCompany(modifyBodyData)
      .subscribe(
        response=>{
          this.loading=false;
          this.loginService.successFullMessage("Your Company Details Saved Successfully....!");
          this.router.navigateByUrl("/manageVendor");
        }, 
        error=>{ 
          this.loading=false; 
          console.error("Error ",error);
          this.loginService.errorMessage("Something went worng....,Please try again..!") 
        })
    }
  }

  get getVendorContactPersonDetails(){
    return this.vendorManagementForm.get("contactPersonDtoList").value;
  }
}
