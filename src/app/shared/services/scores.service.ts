import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  baseUrl:string="http://wd.etsisi.upm.es:10000";

  constructor(private http:HttpClient) { }

  getScores():Observable<any> {
    return this.http.get(config.base_url+"/records");
  }
  //postRecord(newRecord:any):Observable<any>{
    //return this.http.post(this.baseUrl+"/records",newRecord);
  //}
}
