import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/models/employee-model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: EmployeeModel[] | any = [
    // {
    //   id:'1',
    //   name:'John Doe',
    //   email: 'john.doe@gmail.com',
    //   phone: 58291237,
    //   salary: 60000,
    //   department: 'C# Developer'
    // },
    // {
    //   id:'2',
    //   name:'Will Smith',
    //   email: 'wiil.smith@gmail.com',
    //   phone: 57081261,
    //   salary: 40000,
    //   department: 'Java Developer'
    // },
    // {
    //   id:'3',
    //   name:'Sarah Mozart',
    //   email: 'sarah.mozart@gmail.com',
    //   phone: 54928902,
    //   salary: 45000,
    //   department: 'Frontend Developer'
    // }
  ];
  constructor(
    public api: EmployeesService
  ) { }

  ngOnInit(): void {

    this.getEmployees();
  }


  getEmployees() {
this.api.request('getEmployees','get').subscribe({
  next:(response) =>{
    console.log("Get all employees: ",response);
    this.employees = response;
  },
  error:(response)=> {
   console.log(response);   
  }
})
  }

}
