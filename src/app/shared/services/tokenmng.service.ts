import { Injectable } from "@angular/core";
import { UserService } from "./user-service.service";

@Injectable({
  providedIn: "root",
})
export class TokenmngService {
  constructor() {}

  saveToken(token: string) {
    sessionStorage.setItem("token", token);
  }
}
