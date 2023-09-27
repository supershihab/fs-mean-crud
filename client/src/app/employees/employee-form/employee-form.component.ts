import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styles: [
  ]
})
export class EmployeeFormComponent {
  //we can now access the form-builder object inside the employee-form-component
  constructor(public service:EmployeeService) { }
  //form on submit handler
  onSubmit(){
    console.log(this.service.employeeForm.value);
  }

}
