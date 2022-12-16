import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeModel } from '../../../models/employee-model';
import { EmployeesService } from '../../../services/employees.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  empForm?: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public api: EmployeesService,
    public router: Router


  ) { }

  ngOnInit(): void {
    this.empForm = this.formBuilder.group({
      //initialize the form control
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      salary: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  addNewEmployee() {
    if (this.empForm?.valid) {
      this.api.request('addEmployee', 'post', this.empForm?.value).subscribe(async result => {
        console.log("Form values: ", result);
        if (result) {
          const { value: redirectUrl } = await Swal.fire('Success', `Employee ${this.empForm?.value.name} added successfully!!`, 'success');
          if (redirectUrl) this.router.navigate(['employees']);
        }
      });
    }

  }
}
