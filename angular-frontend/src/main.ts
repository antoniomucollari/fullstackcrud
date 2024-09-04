import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {EditContactComponent} from "./app/contacts/edit-contact/edit-contact.component";
import routeConfig from "./routes";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";

bootstrapApplication(AppComponent,{
  providers: [AppComponent,provideHttpClient(), provideRouter(routeConfig), provideAnimationsAsync(), provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 2500,
      progressBar: true,
      maxOpened: 5,
    })],
}).catch((err) => console.error(err));

