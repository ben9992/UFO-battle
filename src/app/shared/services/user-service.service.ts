import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { config } from "../models/config";
import { TokenmngService } from "./tokenmng.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  // username: string = "";
  // password: string = "";
  private usersUrl = `${config.base_url}/users`;
  constructor(private http: HttpClient, private tokenMng: TokenmngService) {}

  login(user: string, pass: string): Observable<any> {
    // this.username = user;
    // this.password = pass;
    return this.http.get(
      `${this.usersUrl}/login?username=${user}&password=${pass}`,
      { observe: "response" }
    );
  }

  // refreshLogin() {
  //   if (this.username === "" || this.password === "") return;
  //   this.http
  //     .get(
  //       `${this.usersUrl}/login?username=${this.username}&password=${this.password}`,
  //       {
  //         observe: "response",
  //       }
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         const token = response.headers.get("Authorization");
  //         if (token) this.tokenMng.saveToken(token);
  //       },
  //     });
  // }

  isUserLoggedIn() {
    const token = this.tokenMng.getToken();
    return token !== null;
  }

  logOut() {
    this.tokenMng.removeToken();
    // this.username = "";
    // this.password = "";
  }

  checkUsernameExists(username: string) {
    return this.http.get<boolean>(`${this.usersUrl}/${username}`);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(this.usersUrl, user);
  }
}
