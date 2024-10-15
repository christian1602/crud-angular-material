import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeService } from '../../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../models/employee.model';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'packageOffered',
    'action'
  ];

  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private coreService: CoreService
  ){}

  ngOnInit(): void {
    this.listEmployees();
  }

  openFormDialog(){
    const dialogRef = this.dialog.open(EmployeeFormComponent);
    dialogRef.afterClosed()
      .subscribe({
        next: (isClosed) => {
          if (isClosed){
            this.listEmployees();
          }
        }
      });
  }

  private listEmployees(): void{
    this.employeeService.listEmployees()
      .subscribe({
        next: (employees) => {
          this.dataSource = new MatTableDataSource(employees);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id)
      .subscribe({
        next: (() => {
          this.listEmployees();
          this.coreService.openSnackBar('Employee deleted!','done');
        }),
        error: (err) => console.error(err)
      });
  }

  openFormDialogToEdit(employee: Employee){
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      data: employee
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (isClosed) => {
          if (isClosed){
            this.listEmployees();
          }
        }
      });
  }
}
