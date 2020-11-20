import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MasterDataService } from 'src/app/service/master-data.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {

  loading;
  // requiredVirable
  gstNum;
  costCen;

  constructor(private masterData:MasterDataService) {
    this.loading=false;
  }

  ngOnInit(): void {
    
  }

  onCompanySelected(item, model, label){
    this.gstNum = item.gstnumber;
    this.costCen = item.costCenter;
  }

  getCompany(value){
    if (value == null || value == undefined || value == '') { value = null }
    return this.masterData.getCompanyDetails(value)
      .subscribe(
        response=>{ return response.data},
        error=> {console.error("Error", error);}
      )
  }

}
