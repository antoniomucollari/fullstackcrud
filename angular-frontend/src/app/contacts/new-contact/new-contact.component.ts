import {Component, DestroyRef, EventEmitter, inject, Output, signal, SimpleChanges} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ContactsService} from "../contacts.service";
import {ButtonComponent} from "../../shared/button/button.component";
import {ToastrService} from "ngx-toastr";
import {ErrorService} from "../../shared/error.service";

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent
  ],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.css'
})
export class NewContactComponent {
  @Output() close = new EventEmitter<void>();
  private errService = inject(ErrorService);
  private contactService = inject(ContactsService);
  private toastr = inject(ToastrService);
  private destroyRef = inject(DestroyRef);
  completed = signal<boolean>(true)
  enteredName = '';
  enteredEmail = '';
  enteredTitle = '';
  enteredPhone = '';
  enteredAddress = '';
  enteredStatus: 'Active' | 'Inactive' = 'Active';
  enteredPhotoUrl = '';
  onSubmit() {
    if ((this.enteredName=== '' || this.enteredEmail=== '' || this.enteredTitle === ''|| this.enteredPhone=== '' || this.enteredAddress=== '') ) {
      this.toastr.error('All fields must be filled!');
      this.completed.set(false)
      return
    }
    else{
      this.completed.set(true)
      const photoName:string | undefined = this.contactService.getFileName(this.enteredPhotoUrl);
      const subscription = this.contactService.postContact({
        id: '',
        name: this.enteredName,
        email: this.enteredEmail,
        title: this.enteredTitle,
        phone: this.enteredPhone,
        address: this.enteredAddress,
        status: this.enteredStatus,
        photoUrl: photoName,
      }).subscribe({
        next: result => {
          // this.contactService.contacts.set([...this.contactService.contacts(),result]) //optimistic update
          this.contactService.triggerRefreshContacts();
          this.close.emit()
        },
        error: error => {
          console.log(error)
          this.toastr.error('Failed to create new contact!');
          this.errService.showError("Backend server did not respond to create a new contact. Try again later")
        },
        complete: ()=>this.toastr.success('Contact added successfully!'),
      })
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe()
      })

    }
  }
  onCancel() {
    this.close.emit()
  }
}
