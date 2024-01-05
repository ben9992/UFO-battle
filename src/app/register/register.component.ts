import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../shared/services/user-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
    reppassword:''
  };
  isLoggedIn: boolean = false;
  usernameExists: boolean = false;
  usernameChecked: boolean = false;


  constructor(private userService: UserServiceService) {
    // Check user's login status here and set isLoggedIn accordingly
  }

  checkUsername() {
    if (this.user.username) {
      this.userService.checkUsernameExists(this.user.username)
        .subscribe(
          (exists: boolean) => {
            console.log('Username exists:', exists);
            this.usernameExists = exists;
            this.usernameChecked = true;
          },
          (error) => {
            console.error('Error checking username uniqueness:', error);
            // Handle error if the API call fails
          }
        );
    }
  }

  onSubmit() {
    this.userService.registerUser(this.user).subscribe((data) => {
      console.log(data);
    });
  
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
