import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableService } from 'src/app/service/data-table.service';
import { LoginService } from 'src/app/service/login.service';
import { MasterDataService } from 'src/app/service/master-data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.scss']
})
export class DriverManagementComponent implements OnInit {

  @ViewChild('approvedclose') approvedclose: ElementRef;
  
  // required variables
  loading
  driverList
  updateDriverDetailsForm: FormGroup

  driverListTableColumns=[
    {title:'Name',data:'firstName'},
    {title:'Mobile Number',data:'mobileNumber'},
    {title:'Email',data:'emailId'},
    {title:'Car Brand/Model',data:'carDetailDto.subType.name'},
    {title:'Action',data:'',orderable: false}, 
  ]

  driverListTabelColumnsDef=[
    {
      "targets": -1, // specifies the position of button(last but one) in the row
      "data": null,
      "createdCell": (td, cellData, rowData, row, col) => {
        $(td).on('click',event=>{ 
          const {firstName,accountId, emailId, mobileNumber}=rowData 
          let filterName= firstName && firstName.split(' ')
          this.updateDriverDetailsForm.patchValue({
            'accountId': accountId, 
            'firstName':filterName.length >0 && filterName[0], 
            'lastName': filterName.length >0 && filterName[1], 
            'emailId': emailId,
            mobileNumber
          })
        })
      },
      "defaultContent": "<button type='button' class='button-small' data-toggle='modal' data-target='#modifyDriverDetails'><i class='fa fa-search-minus' aria-hidden='true'></i></button>"
    },
    {
      "targets": -2, // specifies the position of button(last but one) in the row
      "render": function ( data, type, row ) {
        if(row.carDetailDto && (row.carDetailDto.subType.name !== "" || row.carDetailDto.subType.name !== null || row.carDetailDto.subType.name !== undefined)) {
          return row.carDetailDto.subType.name;
        }else{
          return ""
        }
      },
    }
   ]

  constructor(
    private formBulider:FormBuilder,
    private masterData: MasterDataService,
    private dataTableService: DataTableService,
    private userService:UserService,
    private loginService:LoginService
  ) { this.loading=false;}

  ngOnInit(): void {
    this.loading=true;
    this.masterData.getDriverSerach('')
    .subscribe(
      response=>{
        this.driverList=response;
        this.loading=false;
        this.dataTableService.dataTable("#driverManagmentList", this.driverListTableColumns, this.driverList, this.driverListTabelColumnsDef)
      },error=>{ this.loading=false; console.error("Error: ",error)})

      // this is update form initlizations
      this.updateDriverDetailsForm= this.formBulider.group({
        'accountId': new FormControl(''), 
        'firstName': new FormControl(''), 
        'lastName': new FormControl(''), 
        'emailId': new FormControl(''),
        'mobileNumber': new FormControl('')
      })
  }

  // this method will used for the update the driver details
  updateDriverDetails(){
    if(this.updateDriverDetailsForm.status == "VALID"){
      const { value }=this.updateDriverDetailsForm
      this.loading=true;
      var url =value.accountId+"/"+value.firstName+"/"+value.lastName+"/"+value.emailId+"/";
      this.updateDriverDetailsForm.get('mobileNumber').dirty ?  url=url.concat(this.updateDriverDetailsForm.get('mobileNumber').value+"/") : url=url.concat("null/")
      url=url+true;
      this.updateUrlCall(url);
    }
  }

  // this method used for deteling driver
  deleteDriver(){
    const { value }=this.updateDriverDetailsForm
    this.loading=true;
    var url =value.accountId+"/"+value.firstName+"/"+value.lastName+"/"+value.emailId+"/"+value.mobileNumber+"/";
    url=url+false;
    this.updateUrlCall(url);
  }

  // this method will call api url
  updateUrlCall(url){
    this.userService.updateProfile(url)
      .subscribe(
        response=>{
          const { message }=response
          this.loading=false;
          this.loginService.successFullMessage(message);
          this.approvedclose.nativeElement.click();
          this.ngOnInit();
        },error=>{ this.loading=false; this.loginService.errorMessage("Something went worng...Please try again...!"), console.error("Error ",error);}
      )
  }

}
