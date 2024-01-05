import { Component } from "@angular/core";
import { UserService } from "./shared/services/user-service.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "Ufo Game";
  isUserLoggedIn = false;

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.userService.isUserLoggedIn();
  }

  logout() {
    this.userService.logOut();
    window.location.href = "/home";
  }
}
