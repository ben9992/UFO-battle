export class Missile {
  left: number;
  bottom: number;
  width: number;
  height: number;

  constructor(left: number = 300, bottom: number = 25, width: number = 10, height: number = 70) {
    this.left = left;
    this.bottom = bottom;
    this.width = width;
    this.height = height;
  }
}

// export class Missile {
//     position: number;
//     launched: boolean;
//     speed: number;
  
//     constructor() {
//       this.position = 0; // Initial position at the bottom
//       this.launched = false;
//       this.speed = 10; 
//     }
  
//     launch(): void {
//       this.launched = true;
//     }
  
//     move(): void {
//       if (this.launched) {
//         this.position -= this.speed; // Move missile upwards
//       }
//     }
  
// }
  