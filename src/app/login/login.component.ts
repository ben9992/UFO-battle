import { Component } from '@angular/core';
import { UserServiceService } from '../shared/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username:string="";
  password:string="";
  mytoken:string="";

  constructor(private user:UserServiceService){
  }
  dologin(){
    this.user.login(this.username,this.password).subscribe({
      next:(values) =>{this.mytoken=values.headers.get("Authorization");
      console.log(this.mytoken);
      },
      error:(err)=>{console.log("There was an error");
    //alert the the user
    if(this.username=="" || this.password=="")
      alert("Please fill the fields");
    else
      alert("Your username and password are not correct, please try again");}
    })
  }
}
