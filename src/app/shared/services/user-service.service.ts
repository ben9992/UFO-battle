import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { config } from "../models/config";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private usersUrl = `${config.base_url}/users`;
  private localStorage;
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = document.defaultView?.localStorage;
  }

  login(user: string, pass: string): Observable<any> {
    return this.http.get(
      `${this.usersUrl}/login?username=${user}&password=${pass}`,
      { observe: "response" }
    );
  }

  isUserLoggedIn() {
    if (this.localStorage) return !!this.localStorage.getItem("token");
    else return false;
  }

  logOut() {
    if (this.localStorage) this.localStorage.removeItem("token");
  }

  checkUsernameExists(username: string) {
    return this.http.get<boolean>(`${this.usersUrl}/${username}`);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(this.usersUrl, user);
  }
}
