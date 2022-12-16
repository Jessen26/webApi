import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type } from 'os';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  baseApiUrl:string=environment.baseApiUrl;
  constructor(
    private http: HttpClient
  ) { }

endpoints:{[endpoint:string]:string |any} ={
  getEmployees:`${this.baseApiUrl}api/employees`,
  addEmployee:`${this.baseApiUrl}api/employees`,
  empDetail:(id:string)=>`${this.baseApiUrl}api/employees/${id}`,
  editEmployee:(id:string)=>`${this.baseApiUrl}api/employees/${id}`,
}



  request(url: endpointType, method: string, payload?: Object, urlParams?: any) {
   const finalUrl = !urlParams ? this.endpoints[url] : this.endpoints[url](urlParams); // condition ? true:false
    return !payload ? this.http.request(method,finalUrl): this.http.request(method,finalUrl,{body:payload});
  
  }


}
export type endpointType = 'getEmployees' | 'addEmployee' | 'editEmployee' | 'empDetail';