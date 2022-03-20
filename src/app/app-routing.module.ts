import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { MulticahrtComponent } from './multicahrt/multicahrt.component';
import { TablesComponent } from './tables/tables.component';


const routes: Routes = [
  {
    path:"",
    component:ChartsComponent
  },
  {
  path:"tables",
  component:TablesComponent
},
{
  path:"multichart",
  component:MulticahrtComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
