import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  // varaible delcartions
  loading;

  constructor() { 
    this.loading=false;
  }

  ngOnInit(): void {
  }

  submitSupport(data){
    console.warn("Data ",data);
  }

}
