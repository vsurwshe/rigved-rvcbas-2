import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  // required variables
  loading;
  driverManagement: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService:LoginService
  ) { this.loading=false;}

  ngOnInit(): void {
    this.driverManagement= this.formBuilder.group({
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'mobileNumber': new FormControl(),
      'secMobileNumber': new FormControl(),
      'emailId': new FormControl()

    })
  }

  driverRegistration(){
    console.log("Data ", this.driverManagement)
  }

}
