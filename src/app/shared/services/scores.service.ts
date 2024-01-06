import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { config } from "../models/config";
import { TokenmngService } from "./tokenmng.service";

@Injectable({
  providedIn: "root",
})
export class ScoresService {
  recordsUrl: string = `${config.base_url}/records`;

  constructor(private http: HttpClient, private tokenMng: TokenmngService) {}

  getScores(): Observable<any> {
    return this.http.get(this.recordsUrl);
  }

  getScoresByUser(user: string): Observable<any> {
    const token = this.tokenMng.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.recordsUrl}/${user}`, { headers });
  }

  postRecord(newRecord: any): Observable<any> {
    const token = this.tokenMng.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.recordsUrl, newRecord, { headers });
  }
}
