import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styles: [],
})
export class EmployeeFormComponent {
  submitted: boolean = false;
  //we can now access the form-builder object inside the employee-form-component
  constructor(public service: EmployeeService, private toastr: ToastrService) {}
  //form on submit handler
  onSubmit() {
    this.submitted = true;
    if (this.service.employeeForm.valid) {
      debugger;
      if (this.service.employeeForm.get('_id')?.value == '') {
        this.service.postEmployee().subscribe((res) => {
          console.log('Response Saved!');
          this.toastr.success('Created Successfully', 'Employee Register');
          // this.resetForm();
          this.service.fetchEmployeeList();
        });
      } else {
        this.service.putEmployee().subscribe((res) => {
          this.service.fetchEmployeeList();
          console.log('Response Updated!');
          this.toastr.info('Updated Successfully', 'Employee Register');
          // this.resetForm();  
        });
        // console.log(this.service.employeeForm.value);
      }
    }
  }

  resetForm() {
    this.service.employeeForm.reset();
    // this.service.employeeForm.reset(new Employee());
    this.submitted = false;
  }
}
