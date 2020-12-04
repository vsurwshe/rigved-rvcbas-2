import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { MasterDataService } from 'src/app/service/master-data.service';

@Component({
  selector: 'app-maintance-filter',
  templateUrl: './maintance-filter.component.html',
  styleUrls: ['./maintance-filter.component.scss']
})
export class MaintanceFilterComponent implements OnInit {

  @ViewChild('drivernameinstance', {static: true}) drivernameinstance: NgbTypeahead;
  drivernamefocus$ = new Subject<string>();
  drivernameclick$ = new Subject<string>();

  // required variables
  loading;
  profileData;
  driverArray;

  filterForm: FormGroup;

  formatMatchesByDriverName = (value: any) => value.firstName || '';

  constructor( 
    private formBuilder: FormBuilder, 
    private masterData:MasterDataService,
    private router:Router
  ) { this.loading=false;}

  ngOnInit(): void {
    let buttonHtml: HTMLElement= document.getElementById("defaultOpen") as HTMLElement;
    buttonHtml.click();
    // for accordion
    $('.d-accordion').on('show.bs.collapse', function (n) {
      $(n.target).siblings('.panel-heading').find('.panel-title i').toggleClass('fa-chevron-up fa-chevron-down ');
    });
    $('.d-accordion').on('hide.bs.collapse', function (n) {
      $(n.target).siblings('.panel-heading').find('.panel-title i').toggleClass('fa-chevron-down fa-chevron-up ');
    });
    let driverSearch= this.masterData.getDriverSerach('');
    this.loading=true;
    forkJoin([driverSearch])
    .subscribe(
      response=>{
        this.loading=false;
        this.driverArray=response[0];
        console.log("Res ",response)
      }, error=>{this.loading=false; console.error("Error ", error);}
    )

    
    // this will used for intialize the form compoent
    this.filterForm= this.formBuilder.group({
      'startDate': new FormControl(),
      'endDate': new FormControl(),
      'driverName': new FormControl()
    })
  }

  driverNameSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.drivernameclick$.pipe(filter(() => !this.drivernameinstance.isPopupOpen()));
    const inputFocus$ = this.drivernamefocus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.driverArray
        : this.driverArray.filter(item => item.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
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
