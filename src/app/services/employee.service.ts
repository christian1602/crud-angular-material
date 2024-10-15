import { Employee } from './../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  listEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${base_url}employees`);
  }

  addEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${base_url}employees`,employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${base_url}employees/${id}`,employee);
  }

  deleteEmployee(id: number): Observable<void>{
    return this.http.delete<void>(`${base_url}employees/${id}`);
  }
}
