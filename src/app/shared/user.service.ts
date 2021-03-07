import { Injectable } from '@angular/core';

import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'


export class User {
  firstname: string;
  lastname: string;
  emailAddress: string;
  dateOfBirth: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // REST API
  endpoint = 'http://localhost:12345';

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getUsers(): Observable<User> {
    return this.httpClient.get<User>(this.endpoint + '/api/users')
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }
  processError(err) {
    let message = '';
    if(err.error instanceof ErrorEvent) {
     message = err.error.message;
    } else {
     message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
 }  
}
