import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fb: FormBuilder) { }
  //use this form to design a form inside employee-form-component
  //we need to inject this EmployeeService class in employee-form-component to be able to use it, we'll inject it in the constructor publicly
  employeeForm = this.fb.group({
    _id: [null],
    fullName: [''],
    position: [''],
    location: [''],
    salary: [''],
  });

}