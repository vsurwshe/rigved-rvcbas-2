import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { MasterDataService } from 'src/app/service/master-data.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  // required variables
  loading;

  clientManagementForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private loginService:LoginService,
    private masterData:MasterDataService,
    private router:Router
  ) { this.loading=false; }

  ngOnInit(): void {
    this.clientManagementForm= this.formBuilder.group({
      'countryCode': new FormControl("IN"),
      'name': new FormControl(),
      'emailId': new FormControl(),
      'mobileNumber': new FormControl(),
      'contactPerson': new FormControl(),
      'gstNum': new FormControl(),
      'address': new FormControl(),
      'area': new FormControl() ,
      'city':new FormControl() ,
      'state': new FormControl() ,
      'pincode': new FormControl(),
      'active': new FormControl(true) 
    })
  }

  saveClientDetails(){
    if(this.clientManagementForm.status== "VALID"){
      const { value }=this.clientManagementForm
      this.loading=true;
      this.masterData.savePatner(value)
      .subscribe(
        response=>{
          this.loading=false;
          this.loginService.successFullMessage("Client Registered Successfully ..!")
          this.router.navigateByUrl("/manageClient");
        },
        error=>{
          this.loading=false;
          this.loginService.errorMessage("Something Went Worng...., Please try again...!");
          console.error("Error ",error);
        });
    }
  }

}
