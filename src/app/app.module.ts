import { NgModule } from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { PlayComponent } from "./play/play.component";
import { PreferencesComponent } from "./preferences/preferences.component";
import { RecordsComponent } from "./records/records.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { ScoresService } from "./shared/services/scores.service";
import { FormsModule } from "@angular/forms";
import { UserService } from "./shared/services/user-service.service";
import { PreferencesService } from "./shared/services/preferences.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayComponent,
    PreferencesComponent,
    RecordsComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    provideClientHydration(),
    UserService,
    ScoresService,
    PreferencesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
