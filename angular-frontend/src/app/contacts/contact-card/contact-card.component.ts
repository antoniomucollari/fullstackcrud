import {Component, DestroyRef, EventEmitter, inject, input, Input, Output, signal} from '@angular/core';
import {Contact} from "../contacts.model";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {ContactsService} from "../contacts.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {ButtonComponent} from "../../shared/button/button.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [
    RouterLink,
    MatIcon,
    ButtonComponent,
  ],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css'
})
export class ContactCardComponent {
  contact = input.required<Contact>()
  private contactService = inject(ContactsService);
  private destroyRef = inject(DestroyRef);
  @Output() contactDeleted = new EventEmitter<void>();

  constructor(private toastr: ToastrService) {}

  deleteContact(id: string) {
    const subscription = this.contactService.deleteContact(id).subscribe({
      next: result => {
          // this.contactService.contacts.update(prevContact => prevContact.filter(p => p.id !== id)); //optimistic update before paginator
          this.contactDeleted.emit();
          this.toastr.success('Contact deleted successfully');
      },
      error: err => {
        this.toastr.error('Failed to delete contact');
        console.error('Error during deletion:', err.message);
      }
    })
    this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
    });

  }
}
