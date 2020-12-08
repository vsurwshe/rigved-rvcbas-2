import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
declare var $;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  // required variable
  loading;
  showOtp;
  otpCorrect;
  showMobile;

  resetPasswordFormGroup:FormGroup;
  constructor(private formBuilder:FormBuilder, private loginService:LoginService) { 
    this.loading=false;
    this.showOtp=false;
    this.otpCorrect=false;
    this.showMobile=true;
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $(".toggle-password").click(function() {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
        input.attr("type", "text");
        } else {
        input.attr("type", "password");
        }
    });
    });
    this.resetPasswordFormGroup= this.formBuilder.group({
      'userName': new FormControl(),
      'OTP': new FormControl(),
      'rePassword': new FormControl(),
      'reConformPassword': new FormControl()
    })
  }

  myFunction(id) {
    console.log("ID ",id)
    var x:any = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  sendOtp(){
    const {userName }=this.resetPasswordFormGroup.value
    if(userName !="" && userName != null){
      console.log("Data", this.resetPasswordFormGroup)
      this.showMobile=false;
      this.showOtp=true;
    }else{
      this.loginService.errorMessage("Please enter valid mobile number")
    }
  }

  verifyOtp(){
    const {OTP }=this.resetPasswordFormGroup.value
    if(OTP !="" && OTP != null){
      console.log("Data", this.resetPasswordFormGroup)
      this.showMobile=false;
      this.showOtp=false;
      this.otpCorrect=true;
    }else{
      this.loginService.errorMessage("Please enter valid OTP Number")
    }
  }

  submitResetPassword(){
    console.log("Data", this.resetPasswordFormGroup)
  }

}
