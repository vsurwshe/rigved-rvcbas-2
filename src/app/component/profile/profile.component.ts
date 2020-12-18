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
  readProfileData;

  updateProfileForm:FormGroup;
  changePasswordForm: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private loginService:LoginService,
    private userService:UserService
  ) { this.loading=false; this.profileData={}}

  ngOnInit(): void {
    this.loading=true;
    this.userService.readProfile(this.loginService.getUserAccountId())
    .subscribe(
      response=>{
        this.readProfileData=response;
        this.loading=false;
        let buttonHtml: HTMLElement= document.getElementById("defaultOpen") as HTMLElement;
        buttonHtml.click();
        this.setProfileData();
      },error=>{
        this.loading=false; 
        this.loginService.errorMessage("Something went worng....can not read profile"); 
        console.error("Error ",error);
      }
    )
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
  }

  setProfileData(){
    const { firstName, lastName, emailId}=this.readProfileData
    this.updateProfileForm.patchValue({ firstName, lastName, emailId })
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

  // this method will used for call update user profile api
  saveUpdateProfile(){
    if(this.updateProfileForm.status =="VALID"){
      const { value }= this.updateProfileForm
      let modifyBodyData={...value, accountId: this.loginService.getUserAccountId()}
      this.loading=true;
      this.userService.updateProfile(modifyBodyData)
      .subscribe(
        response=>{
          this.loginService.successFullMessage("Your profile details updated successfully...!");
          this.ngOnInit();
        },error=>{ this.loading=false; this.loginService.errorMessage("Something went worng...Please try again!");}
      )
    }
  }

  // this method will used for call change password api
  changePassword(){
    if(this.changePasswordForm.status == "VALID"){
      const { value }= this.changePasswordForm
      let modifyData={
        ...value,
        'accountId': this.loginService.getUserAccountId()
      }
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
