import {
	Component,
	ElementRef,
	HostListener,
	OnInit,
	Renderer2,
} from "@angular/core";
import { Ufo } from "../shared/models/ufo.model";
import { Missile } from "../shared/models/missile.model";
import { PreferencesService } from "../shared/services/preferences.service";
import { UserService } from "../shared/services/user-service.service";
import { ScoresService } from "../shared/services/scores.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-play",
	templateUrl: "./play.component.html",
	styleUrls: ["./play.component.css"],
})
export class PlayComponent implements OnInit {
	seconds = 0;
	score = 0;
	nUfo!: number;
	setOfUfos: Ufo[] = [];
	hit: Ufo | null = null;
	missile!: Missile;
	scoreDeducted: boolean = false;
	timeCount: any;
	isUserLoggedIn = false;

	constructor(
		private renderer: Renderer2,
		private el: ElementRef,
		private preferencesService: PreferencesService,
		private scoresService: ScoresService,
		private router: Router,
		private userService: UserService
	) {}
	ngOnInit(): void {
		this.seconds = this.preferencesService.getTime();
		this.nUfo = this.preferencesService.getUfoCount();

		this.timeCount = setInterval(() => {
			this.countTime();
		}, 1000);

		for (let i = 0; i < this.nUfo; i++) {
			this.createTag("ufo" + i, i);
		}

		for (let i = 0; i < this.nUfo; i++) {
			this.setOfUfos.push(new Ufo("ufo" + i));
		}

		for (let i = 0; i < this.nUfo; i++) {
			this.initUfoByIndex(i);
		}

		this.createMTag();
		this.missile = new Missile("missile", 0);
	}

	private initUfoByIndex(i: number) {
		this.setOfUfos[i].pid = setInterval(() => {
			this.setOfUfos[i].move();
		}, 25);

		for (let i = 0; i < this.nUfo; i++) {
			this.setOfUfos[i].hitId = setInterval(() => {
				this.checkForAHit(this.setOfUfos[i], this.missile);
			}, 10);
		}
	}

	recordScore() {
		this.scoresService
			.postRecord({
				punctuation: this.score,
				ufos: this.nUfo,
				disposedTime: this.preferencesService.getTime(),
			})
			.subscribe({
				next: () => {
					alert("Score saved");
					this.router.navigate(["/records"]);
				},
				error: (err) => {
					alert("There was an error");
				},
			});
	}

	countTime() {
		this.seconds--;
		if (this.seconds === 0) {
			this.isUserLoggedIn = this.userService.isUserLoggedIn();
			this.stopGame();
		}
	}

	createTag(name: string, number: number) {
		let newImg = this.renderer.createElement("img");
		this.renderer.setAttribute(newImg, "id", name);
		this.renderer.setAttribute(newImg, "class", "setOfUfos");
		this.renderer.setAttribute(newImg, "src", "assets/imgs/ufo.png");
		this.renderer.setStyle(newImg, "width", "70px");

		//Posición inicial de cada ufo
		let rLimit = window.innerWidth - 70, //ancho de la nave
			uLimit = window.innerHeight - 70, //altura de la nave
			newleft = Math.random() * rLimit,
			newbottom = uLimit - (60 + number * 70); //Limite para que no se suban unos encima de otros

		this.renderer.setStyle(newImg, "left", newleft + "px");
		this.renderer.setStyle(newImg, "bottom", newbottom + "px");

		this.renderer.appendChild(this.el.nativeElement, newImg);
	}

	createMTag() {
		let newImg = this.renderer.createElement("img");
		this.renderer.setAttribute(newImg, "id", "missile");
		this.renderer.setAttribute(newImg, "class", "missile");
		this.renderer.setAttribute(newImg, "src", "assets/imgs/misil.jpg");
		this.renderer.setStyle(newImg, "width", "40px");
		this.renderer.setStyle(newImg, "height", "70px");

		this.renderer.setStyle(newImg, "left", 50 + "px");
		this.renderer.setStyle(newImg, "bottom", 10 + "px");

		this.renderer.appendChild(this.el.nativeElement, newImg);
	}

	ngOnDestroy(): void {
		this.stopGame();
	}

	stopGame() {
		for (let i = 0; i < this.nUfo; i++) {
			clearInterval(this.setOfUfos[i].pid);
			clearInterval(this.setOfUfos[i].hitId);
		}
		clearInterval(this.timeCount);
	}

	@HostListener("document:keydown", ["$event"])
	keypressed(theEvent: KeyboardEvent) {
		switch (theEvent.key) {
			case "ArrowRight":
				this.missile.moveHorizontal(this.missile.hstep);
				break;
			case "ArrowLeft":
				this.missile.moveHorizontal(-1 * this.missile.hstep);
				break;
			case " ":
				if (!this.missile.launchedMissile) {
					this.missile.launchedMissile = true;
					this.missile.pid = window.setInterval(() => {
						this.missile.trigger();
					}, 15);
				}
				break;
		}
	}

	checkForAHit(ufo: Ufo, missile: Missile) {
		let theufo = document.getElementById(ufo.id) as HTMLElement;
		let themissile = document.getElementById(missile.id) as HTMLElement;
		let hpos_ufo = parseInt(theufo.style.left),
			vpos_ufo = parseInt(theufo.style.bottom),
			width_ufo = parseInt(theufo.style.width),
			vpos_m = parseInt(themissile.style.bottom),
			hpos_m = parseInt(themissile.style.left),
			width_m = parseInt(themissile.style.width),
			height_m = parseInt(themissile.style.height);

		if (
			vpos_m + height_m >= vpos_ufo - 10 &&
			hpos_m >= hpos_ufo - 10 &&
			hpos_m <= hpos_ufo + width_ufo + 10
		) {
			this.hit = ufo;
		}

		if (this.hit) {
			clearInterval(this.missile.pid);
			const ufoIndex = this.setOfUfos.indexOf(this.hit);
			clearInterval(this.setOfUfos[ufoIndex].hitId);
			clearInterval(this.setOfUfos[ufoIndex].pid);

			//clearInterval(this.);
			this.missile.newMissile();
			this.missile.launchedMissile = false;
			this.score += 100;
			theufo.setAttribute("src", "assets/imgs/explosion.gif");
			setTimeout(() => {
				theufo.setAttribute("src", "assets/imgs/ufo.png");
				this.initUfoByIndex(ufoIndex);
			}, 500);
			this.hit = null;
		} else if (this.missile.vpos > this.missile.conf.uLimit) {
			// Check if a new missile is created and no hit is registered
			if (!this.missile.alreadyMissed) {
				this.score -= 25;
				this.missile.alreadyMissed = true; // Mark the missile as having missed the target
			}
		} else {
			// Reset the flag when a new missile is launched
			this.missile.alreadyMissed = false;
		}

		if (this.missile.vpos === 0) this.scoreDeducted = false;
	}
}
