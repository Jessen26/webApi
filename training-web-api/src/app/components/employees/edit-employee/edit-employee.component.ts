import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeModel } from 'src/app/models/employee-model';
import { EmployeesService } from 'src/app/services/employees.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  empFormDetail?:FormGroup;
  empId:string | null ='';
  empDetails: EmployeeModel | Object = {};
  constructor(
    public formBuilder:FormBuilder,
    public api:EmployeesService,
    public router:Router,
    public activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.empId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('empId: ', this.empId);
    if (this.empId) {
      this.getEmpDetails();
    }

    this.empFormDetail = this.formBuilder.group({
      //initialize the form control
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      salary: ['', Validators.required],
      department: ['', Validators.required]
    });

  }


  getEmpDetails() {
    this.api.request('empDetail', 'get', undefined, this.empId).subscribe((result: any) => {
      console.log('Employee Details: ', result);
      this.empFormDetail?.patchValue(result); //patchValue is a method in formgroup,here it will read and prepopulate the inputs with values 
      this.empDetails = result;
    })
  }

  editEmployee(){
    if (this.empFormDetail?.valid) {
      this.api.request('editEmployee', 'put', this.empFormDetail?.value, this.empId).subscribe(async (result: { [key: string]: string | any }) => {
        console.log("Updated Employee: ", result);
        if (result) {
          const { value: redirectUrl } = await Swal.fire('Success', 'Successfully edited Employee details!', 'success');
          console.log("redirect Url: ", redirectUrl);
          if (redirectUrl) this.router.navigate(['employees']);
        }

      });
    }
  }


  deleteEmployee(){
    this.api.request('empDetail','delete',undefined,this.empId).subscribe(
      {
        next:(response) =>{

         
            console.log(response);
           Swal.fire('Success', 'Successfully deleted Employee details!', 'success');
            this.router.navigate(['employees']);

        },
        error:(response) =>{
          console.log(response);
          Swal.fire('Failed', 'Employee could not be removed!', 'error');
        }
      }
    );
  }

}
