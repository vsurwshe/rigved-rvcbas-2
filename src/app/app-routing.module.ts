import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageTripComponent } from './component/manage-trip/manage-trip.component';

export const appRoutes: Routes = [
  {path:"manageTrip", component: ManageTripComponent}
];

export const routes = [
  {path:"/manageTrip", text:"Manage Trip",component: ManageTripComponent, image:"assets/img/customer-list.png"}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
