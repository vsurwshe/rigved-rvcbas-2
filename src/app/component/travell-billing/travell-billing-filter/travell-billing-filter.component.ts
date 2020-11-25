import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-travell-billing-filter',
  templateUrl: './travell-billing-filter.component.html',
  styleUrls: ['./travell-billing-filter.component.scss']
})
export class TravellBillingFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  filtersApply(){
    console.log("Called Filters Apply form filers");
  }

}
