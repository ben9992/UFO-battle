import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../shared/services/user-service.service";
import { User } from "../shared/models/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  user: User = new User();
  repeatPassword: string = "";
  isLoggedIn: boolean = false;
  usernameExists: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    // Check user's login status here and set isLoggedIn accordingly
  }

  checkUsername() {
    if (this.user.username) {
      this.userService.checkUsernameExists(this.user.username).subscribe(
        (exists: boolean) => {
          alert("User is already registered.");
          this.usernameExists = exists;
        },
        (error) => {
          console.error("Error checking username uniqueness:", error);
          // Handle error if the API call fails
        }
      );
    }
  }

  onSubmit() {
    this.userService.registerUser(this.user).subscribe(
      () => {
        alert("User registered successfully.");
        this.router.navigate(["/login"]);
      },
      (err) => {
        if (err.status === 409) alert("User is already registered.");
        else alert("There was an error registering the user.");
      }
    );
  }
}

//  onSubmit() {
//   if (!this.usernameExists) {
//     this.userService.registerUser(this.user)
//       .subscribe(
//         (response: any) => {
//           console.log('Registration successful:', response);
//           // Display a success message to the user
//         },
//         (error) => {
//           console.error('Error during registration:', error);
//           // Handle registration error
//           // Display an error message to the user
//         }
//       );
//   } else {
//     // Inform the user that the username is already taken
//     console.log('Username already exists. Please choose another.');
//   }
// }
