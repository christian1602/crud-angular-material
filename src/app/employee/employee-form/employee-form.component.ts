import { Employee } from './../../models/employee.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!:  FormGroup;
  education: string[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private matDialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private coreService: CoreService
  ){}

  ngOnInit(): void {
    this.education = [
      'Matric',
      'Diploma',
      'Intermediate',
      'Graduate',
      'Post Graduate'
    ];

    this.employeeForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      dob: [''],
      gender: [''],
      education: [''],
      company: [''],
      experience: [0],
      packageOffered: [0]
    });

    this.employeeForm.patchValue(this.data);
  }

  onEmployeeFormSubmit(): void {
    if (this.employeeForm.valid){

      if (this.data) {
        this.employeeService.updateEmployee(this.data.id!,this.employeeForm.value)
        .subscribe({
          next: (employee) => {
            this.coreService.openSnackBar('Employee detail updated!');
            this.matDialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else {
        this.employeeService.addEmployee(this.employeeForm.value)
        .subscribe({
          next: (employee) => {
            this.coreService.openSnackBar('Employee added successfully!');
            this.matDialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    }
  }
}
