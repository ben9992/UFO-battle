import { ScoresService } from './../shared/services/scores.service';
import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit {
   scoresList:Array<any> = [];
   constructor(private scores:ScoresService) { }
   listScores(){
    this.scores.getScores().subscribe({
      //json object 
      next:(values) =>{this.scoresList = values;},
      error:(err)=>{console.log("There was an error");}
    })
   }
   ngOnInit(): void {
    this.listScores();
   }
}
