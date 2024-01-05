import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../models/config';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUrl = 'http://wd.etsisi.upm.es:10000/users';
  
  constructor(private http:HttpClient) { }

  login(user:string, pass:string):Observable<any> {
    return this.http.get(config.base_url+"/users/login?username="+user+"&password="+pass,{observe:'response'});
  }
  checkUsernameExists(username: string) {
    return this.http.get<boolean>(config.base_url+"/users"+username)
  }
  
  registerUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }
  
}
