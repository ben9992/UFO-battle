import { Component } from "@angular/core";
import { Router } from "@angular/router"; // Import Router for redirection
import { UserService } from "../shared/services/user-service.service";
import { User } from "../shared/models/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  user: User = new User();
  mytoken: string = "";

  constructor(private userService: UserService, private router: Router) {}

  dologin() {
    if (!this.user.username.trim() || !this.user.password.trim()) {
      alert("Please fill in both username and password.");
      return;
    }

    this.userService.login(this.user.username, this.user.password).subscribe({
      next: (response) => {
        localStorage.setItem("token", response.body);

        window.location.reload();
      },
      error: (err) => {
        console.error(err);
        if (err.status === 401) {
          alert("Invalid username or password.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      },
    });
  }
}
