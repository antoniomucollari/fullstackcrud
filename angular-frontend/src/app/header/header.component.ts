import {Component, EventEmitter, inject, Input, input, Output, signal, SimpleChanges} from '@angular/core';
import {count} from "rxjs";
import {NewContactComponent} from "../contacts/new-contact/new-contact.component";
import {ContactsService} from "../contacts/contacts.service";
import {ButtonComponent} from "../shared/button/button.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NewContactComponent,
    ButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private contactService = inject(ContactsService);
  count = signal<number>(0)
  isAddingContact: boolean = false;

  ngAfterViewChecked(){
    this.count.set(this.contactService.totalContacts());
  }
  onCloseTask() {
    this.isAddingContact = false
  }
  onStartTask(){
    this.isAddingContact = true
  }
}
