import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';

const routes: Routes = [
  { path: 'employee-list', component: EmployeeListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'employee-list'},
  { path: '**', redirectTo: 'employee-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
