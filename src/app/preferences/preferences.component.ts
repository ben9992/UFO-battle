import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../shared/services/preferences.service';
import { Router } from '@angular/router';
import { UFO } from '../shared/models/ufo.model';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  ufoCount: number = 1;
  time: number = 60;

  constructor(
    private preferencesService: PreferencesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieve preferences from service
    this.ufoCount = this.preferencesService.getUfoCount() || 1;
    this.time = this.preferencesService.getTime() || 60;

    // Simulate a relationship between preferences and UFO model (for illustration purposes)
    //this.simulateUFOBehaviorBasedOnPreferences();
  }

  // Simulate how user preferences might affect UFO behavior
  // simulateUFOBehaviorBasedOnPreferences(): void {
  //   // Create an array of UFOs based on the user-selected count
  //   const ufos: UFO[] = [];
  //   for (let i = 0; i < this.ufoCount; i++) {
  //     // Create UFOs with different properties or behaviors based on preferences
  //     const ufo = new UFO(i * 50, i % 2 === 0 ? 'left' : 'right', this.time / 10);
  //     ufos.push(ufo);
  //   }

  //   // Simulate UFO behavior (e.g., move each UFO)
  //   ufos.forEach(ufo => ufo.move());
  //   // ... other simulation or interaction logic with the UFOs
  // }

  savePreferences(): void {
    if (this.ufoCount < 1 || this.ufoCount > 5) {
      alert('Please select a number of UFOs between 1 and 5');
    } else {
      this.preferencesService.setUfoCount(this.ufoCount);
      this.preferencesService.setTime(this.time);
      // Navigate to the play screen if UFO count is valid
      this.router.navigate(['/play']);
    }
  }
}
