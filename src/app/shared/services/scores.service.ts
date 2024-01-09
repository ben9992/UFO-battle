import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { config } from "../models/config";
import { TokenmngService } from "./tokenmng.service";
import { UserService } from "./user-service.service";

@Injectable({
  providedIn: "root",
})
export class ScoresService {
  recordsUrl: string = `${config.base_url}/records`;

  constructor(
    private http: HttpClient,
    private tokenMng: TokenmngService,
    private userService: UserService
  ) {}

  getScores(): Observable<any> {
    return this.http.get(this.recordsUrl);
  }

  getScoresByUser(user: string): Observable<any> {
    //if (this.tokenMng.validToken()) this.userService.refreshLogin();
    const token = this.tokenMng.getToken();
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    return this.http.get(`${this.recordsUrl}/${user}`, { headers });
  }

  postRecord(newRecord: any): Observable<any> {
    //if (this.tokenMng.validToken()) this.userService.refreshLogin();
    const token = this.tokenMng.getToken();
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    return this.http.post(this.recordsUrl, newRecord, { headers });
  }
}
