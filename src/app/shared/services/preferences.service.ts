import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PreferencesService {
  private defaultUfoCount: number = 1;
  private defaultTime: number = 60;

  getUfoCount(): number {
    const ufoCountStr = localStorage.getItem("ufoCount");
    const ufoCount = ufoCountStr ? parseInt(ufoCountStr, 10) : null;
    return ufoCount !== null && !isNaN(ufoCount)
      ? ufoCount
      : this.defaultUfoCount;
  }

  getTime(): number {
    const timeStr = localStorage.getItem("time");
    const time = timeStr ? parseInt(timeStr, 10) : null;
    return time !== null && !isNaN(time) ? time : this.defaultTime;
  }

  setUfoCount(ufoCount: number): void {
    localStorage.setItem("ufoCount", ufoCount.toString());
  }

  setTime(time: number): void {
    localStorage.setItem("time", time.toString());
  }
}
