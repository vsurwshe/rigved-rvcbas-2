import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BillService } from 'src/app/service/bill.service';
declare var $;
@Component({
  selector: 'app-travell-billing-filter',
  templateUrl: './travell-billing-filter.component.html',
  styleUrls: ['./travell-billing-filter.component.scss']
})
export class TravellBillingFilterComponent implements OnInit {

  //required variables
  loading;
  profileData;

  filterForm: FormGroup;
  constructor(
    private billService:BillService, 
    private formBuilder:FormBuilder,
    private router:Router
  ) {
    this.loading=false;
    this.profileData={}
  }

  ngOnInit(): void {
    // for accordion
    $('.d-accordion').on('show.bs.collapse', function (n) {
      $(n.target).siblings('.panel-heading').find('.panel-title i').toggleClass('fa-chevron-up fa-chevron-down ');
    });
    $('.d-accordion').on('hide.bs.collapse', function (n) {
      $(n.target).siblings('.panel-heading').find('.panel-title i').toggleClass('fa-chevron-down fa-chevron-up ');
    });
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();

    this.filterForm=this.formBuilder.group({
      'startDate': new FormControl(),
      'endDate': new FormControl()
    })
  }

  openProfile(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  filtersApply(){
    if(this.filterForm.status == "VALID"){
      const {  startDate, endDate}=this.filterForm.value
      let modifyStartDate= startDate.year+"-"+startDate.month+"-"+startDate.day;
      let modifyEndDate= endDate.year+"-"+endDate.month+"-"+endDate.day;
      console.log("Dates ",modifyStartDate, modifyEndDate);
      let bodyData={
        'startDate': modifyStartDate,
        'endDate':modifyEndDate,
        "costCenter": [],
        "employeeIds": [],
        "travelIds": [],
      }
      this.loading=true;
      this.billService.getBillList(0,100,bodyData)
      .subscribe(
        response=>{
          this.loading=false;
          this.router.navigateByUrl("/travelBilling",{state:{'billList':response}})
        },error=>{
          this.loading=false;
          console.error("Error ",error);
        }
      )      
    }
  }

}
