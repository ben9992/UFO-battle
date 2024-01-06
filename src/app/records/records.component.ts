import { TokenmngService } from "../shared/services/tokenmng.service";
import { UserService } from "../shared/services/user-service.service";
import { ScoresService } from "./../shared/services/scores.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrl: "./records.component.css",
})
export class RecordsComponent implements OnInit {
  scoresList: Array<any> = [];
  userScoresList: Array<any> = [];
  isUserLoggedIn = false;
  constructor(
    private scores: ScoresService,
    private userService: UserService,
    private tokenMng: TokenmngService
  ) {}
  listScores() {
    this.scores.getScores().subscribe({
      next: (values) => {
        this.scoresList = values;
      },
      error: (err) => {
        console.log("There was an error");
      },
    });
    if (this.isUserLoggedIn) {
      const user = this.tokenMng.getLoggedInUser();
      if (!user) return;

      this.scores.getScoresByUser(user).subscribe({
        next: (values) => {
          this.userScoresList = values;
        },
        error: (err) => {
          console.log("There was an error");
        },
      });
    }
  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.userService.isUserLoggedIn();
    this.listScores();
  }
}
