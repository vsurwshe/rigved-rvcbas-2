import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintance-filter',
  templateUrl: './maintance-filter.component.html',
  styleUrls: ['./maintance-filter.component.scss']
})
export class MaintanceFilterComponent implements OnInit {

  // required variables
  loading;
  profileData;

  filterForm: FormGroup;

  constructor( 
    private formBuilder: FormBuilder, 
    private router:Router
  ) { this.loading=false;}

  ngOnInit(): void {
    document.getElementById("defaultOpen").click();
    // this will used for intialize the form compoent
    this.filterForm= this.formBuilder.group({
      'startDate': new FormControl(),
      'endDate': new FormControl(),
    })
  }

  // this method will used for the handel tab action
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

  // this method will used for the handel submit function 
  maintanceFiltersApply(){
    if(this.filterForm.status=="VALID"){
      const { value }=this.filterForm
      let modifyStartDate = this.dateConvert(value.startDate);
      let modifyEndDate= this.dateConvert(value.endDate);
      this.router.navigateByUrl("/maintenanceReport",{state:{"startDate":modifyStartDate,"endDate":modifyEndDate}})
    }
  }

  // this method will used for the date conversion
  dateConvert(dateValue){
    const { year, month,day}= dateValue
    return year+"-"+month+"-"+day;
  }
}
