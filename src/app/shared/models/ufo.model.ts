export class UFO {
  left: number;
  bottom: number;
  width: number;
  height: number;
  imageSrc: string;

  constructor(left: number, bottom: number, width: number, height: number, imageSrc: string) {
    this.left = left;
    this.bottom = bottom;
    this.width = width;
    this.height = height;
    this.imageSrc = imageSrc;
  }

}


// export class UFO {
//   left: number;
//   top: number;
//   bottom: number;
//   direction: number;

//   constructor(left: number, top: number, bottom: number, direction: number) {
//     this.left = left;
//     this.top = top;
//     this.bottom = bottom;
//     this.direction = direction;
//   }

//   move(): void {
//     const Rlimit = window.innerWidth;
//     let hpos_ufo = this.left;
//     const width_ufo = 120;

//     if (hpos_ufo + width_ufo >= Rlimit) {
//       this.direction = -1;
//     } else if (hpos_ufo <= 0) {
//       this.direction = 1;
//     }

//     hpos_ufo += this.direction * 5;
//     this.left = hpos_ufo;
//   }
// }

    // Adjust the distance the UFO moves based on its speed
    // const distance = this.speed / 60; // Assuming 60 frames per second
  
    // const screenWidth = 800; // Replace with your screen width
  
    // if (this.direction === 'left') {
    //   this.position -= distance; // Move UFO to the left
    //   // Handle UFO reaching the left boundary
    //   if (this.position < 0) {
    //     this.position = screenWidth; // Reset UFO to the right side
    //   }
    // } else {
    //   this.position += distance; // Move UFO to the right
    //   // Handle UFO reaching the right boundary
    //   if (this.position > screenWidth) {
    //     this.position = 0; // Reset UFO to the left side
    //   }
    // }
  
  

