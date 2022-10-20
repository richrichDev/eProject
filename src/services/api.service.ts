import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment.prod';

import { Observable, throwError } from "rxjs";
import { map,catchError, retry } from "rxjs/operators";

import { from } from 'rxjs';


@Injectable()
export class ApiService {

	public options: any;
    public handleError: any;

    headers: any;

	constructor(
        private http: HttpClient
    )
 
    {

        this.headers = new HttpHeaders();
        this.headers.append('Access-Control-Allow-Origin' , '*');
        this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        this.headers.append('Accept','application/json');
        this.headers.append('content-type','application/json;charset=UTF-8');
        this.headers.append('Accept-Charset','utf-8');

        // this.options = new RequestOptions({ headers:headers});

	}



  getCustomers(): Observable<any>
  {
    var link = "https://61161ff58f38520017a386e7.mockapi.io/api/v1/customer";    
    return this.http.get(link);
  }
    

}