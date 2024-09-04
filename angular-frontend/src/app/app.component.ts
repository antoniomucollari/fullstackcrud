import {Component, inject, input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ContactsComponent} from "./contacts/contacts.component";
import {HeaderComponent} from "./header/header.component";
import {MatIcon} from "@angular/material/icon";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ErrorService} from "./shared/error.service";
import {ErrorModalComponent} from "./shared/modal/error-modal/error-modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactsComponent, HeaderComponent, MatIcon, ErrorModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private errService = inject(ErrorService);
  error = this.errService.error;
}
