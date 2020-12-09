import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // required variables
  loading;
  profileData;

  updateProfileForm:FormGroup;
  changePasswordForm: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private loginService:LoginService,
    private userService:UserService
  ) { this.loading=false; this.profileData={}}

  ngOnInit(): void {
    this.updateProfileForm= this.formBuilder.group({
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'emailId': new FormControl('')
    })  

    this.changePasswordForm=this.formBuilder.group({
      'oldPassword': new FormControl(''),
      'newPassword': new FormControl(''),
      'confirmPassword': new FormControl('')
    })
    let buttonHtml: HTMLElement= document.getElementById("defaultOpen") as HTMLElement;
    buttonHtml.click();
  }

  // this method will used for the handel tab action
  openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  saveUpdateProfile(){
    console.log("Data ", this.updateProfileForm)
  }

  changePassword(){
    if(this.changePasswordForm.status == "VALID"){
      const { value }= this.changePasswordForm
      let modifyData={
        ...value,
        'accountId': this.loginService.getUserAccountId()
      }
      console.log("Data ",modifyData)
      this.loading=true;
      this.userService.changePassword(modifyData)
      .subscribe(
        response=>{
          this.loading=false;
          this.loginService.successFullMessage("Your password changed successfully...!");
          this.changePasswordForm.reset();
        },
        error=>{
          this.loading=false;
          if(error && error.status && error.status== 500){
            this.loginService.errorMessage("You provided worng old password...!");
          }else{
            this.loginService.errorMessage("Something went worng...,Please try again...!");
          }
        })
    }    
  }

}
