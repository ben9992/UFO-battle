import { Component, OnInit } from '@angular/core';
import { UFO } from '../shared/models/ufo.model';
import { Missile } from '../shared/models/missile.model';
import { PreferencesService } from '../shared/services/preferences.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})


export class PlayComponent implements OnInit {
  ufos: UFO[] = []; // Array to store UFO instances
  missile: Missile = new Missile(); // Instance of Missile

  remainingTime: number = 0; // Remaining time in seconds
  finalScore: number = 0; // Final score after game ends

  constructor(private preferencesService: PreferencesService) { }

  ngOnInit(): void {
  // Get the user preferences for UFO count and game time
    let ufoCount = this.preferencesService.getUfoCount();
    let gameTime = this.preferencesService.getTime();
  
  // Set default values if preferences are not set
    if (!ufoCount || ufoCount < 1 || ufoCount > 5) {
       ufoCount = 1; // Default UFO count
     }
    if (!gameTime || ![60, 120, 180].includes(gameTime)) {
       gameTime = 60; // Default game time
    }
  
    // Create UFO instances based on user preferences
    for (let i = 0; i < ufoCount; i++) {
        const direction = i % 2 === 0 ? 'left' : 'right'; // Alternate direction
        const speed = 5 + i; // Varying speeds for UFOs (example)

    //   const ufo = new UFO(i * 100, direction, speed); // Adjust initial positions
    //   this.ufos.push(ufo);
    }
  
  //   this.remainingTime = gameTime;
  //   this.startGame();
  }
  

  // startGame(): void {
  //   // Start game logic
  //   const gameInterval = setInterval(() => {
  //     // Game loop
  //     this.updatePositions();
  //     this.checkCollisions();
  //     this.updateUI();

  //     this.remainingTime--;

  //     if (this.remainingTime <= 0) {
  //       clearInterval(gameInterval);
  //       this.endGame();
  //     }
  //   }, 1000); // Update game state every second
  // }

  // updatePositions(): void {
  //   // Update positions of UFOs and Missile based on their properties
  //   this.ufos.forEach(ufo => ufo.move());
  //   this.missile.move();
  // }

  // checkCollisions(): void {
  //   // Check for collisions between UFOs and Missile
  //   // Implement collision detection logic
  // }

  // updateUI(): void {
  //   // Update the UI based on the positions of UFOs and Missile
  //   // Display remaining time and scores
  // }

  // launchMissile(): void {
  //   // Handle user input to launch the Missile
  //   if (!this.missile.launched) {
  //     this.missile.launch();
  //   }
  // }

  // endGame(): void {
  //   // End the game and calculate the final score
  //   // Apply the scoring rules based on the provided instructions
  //   this.calculateFinalScore();
  //   // Display final score and any end-of-game messages
  // }

  // calculateFinalScore(): void {
  //   // Implement final score calculation logic based on game rules
  // }
}