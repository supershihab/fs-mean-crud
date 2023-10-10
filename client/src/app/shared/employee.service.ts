import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  readonly baseUrl = 'http://localhost:5038/api/employees';

  //get all employees
  list: Employee[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}
  //use this form to design a form inside employee-form-component
  //we need to inject this EmployeeService class in employee-form-component to be able to use it, we'll inject it in the constructor publicly
  employeeForm = this.fb.group({
    _id: [''],
    fullName: ['', Validators.required],
    position: ['', Validators.required],
    location: [''],
    salary: ['', Validators.required],
  });

  //to get all of the employees from db, we need to consume getAllEmployees() method from server API
  //Invoke this fetch method inside the parent employee.component.ts
  fetchEmployeeList() {
    this.http
      .get(this.baseUrl)
      .pipe(catchError(this.handleError))
      .subscribe((data) => {
        this.list = data as Employee[];
        // console.log(data);
      });
  }

  postEmployee() {
    console.log(this.employeeForm.value);
    return this.http
      .post(this.baseUrl, this.employeeForm.value)
      .pipe(catchError(this.handleError));
  }

  putEmployee() {
    return this.http
      .put(
        this.baseUrl + this.employeeForm.get('_id')?.value,
        this.employeeForm.value
      )
      .pipe(catchError(this.handleError));
  }

  deleteEmployee (_id: string) {
    return this.http
      .delete(this.baseUrl + _id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
