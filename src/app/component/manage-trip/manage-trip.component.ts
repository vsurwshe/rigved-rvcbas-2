import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-trip',
  templateUrl: './manage-trip.component.html',
  styleUrls: ['./manage-trip.component.scss']
})
export class ManageTripComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById("defaultOpen").click();
  }

  openTab(evt, cityName):void {
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

}
