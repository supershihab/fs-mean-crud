import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  //inject the service in the constructor to fetch all employees
  constructor (public service:EmployeeService) {}
  ngOnInit(): void {
      this.service.fetchEmployeeList();
  }
}
