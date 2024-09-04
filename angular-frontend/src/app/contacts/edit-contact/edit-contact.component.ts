import {Component, DestroyRef, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ContactsService} from "../contacts.service";
import {ContactCardComponent} from "../contact-card/contact-card.component";
import {LoadingContainerComponent} from "../../shared/loading-container/loading-container.component";
import {Contact} from "../contacts.model";
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from "../../shared/button/button.component";
import {ToastrService} from "ngx-toastr";
import {ErrorService} from "../../shared/error.service";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [
    ContactCardComponent,
    LoadingContainerComponent,
    FormsModule,
    ButtonComponent
  ],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent {

  private errService = inject(ErrorService);
  private contactService = inject(ContactsService);
  private destroyRef = inject(DestroyRef);
  route: ActivatedRoute = inject(ActivatedRoute);
  contactId = '';
  initialImg = signal<string>('')
  isFetching = signal<boolean>(false)
  error = signal('')
  completed = signal(true)
  constructor(private router: Router,private toastr: ToastrService){
    this.contactId = this.route.snapshot.params['id'];
    this.isFetching = signal(true)
    const subscription = this.contactService.getContact(this.contactId).pipe(
      catchError(error=>{
        if (error.status === 404) {
          this.error.set('Not found 404')
        }
        return throwError(() => new Error(error))
      })).subscribe({
      next: (contact:Contact) => {
        this.enteredName= contact.name;
        this.enteredEmail = contact.email;
        this.enteredPhone = contact.phone
        this.enteredAddress = contact.address;
        this.enteredTitle = contact.title;
        this.enteredStatus = contact.status;
        this.initialImg.set(contact.photoUrl)
      },

      error: error => {
        if (!this.error()){
        this.error.set('Server did not respond to create new contact. Try again later!')
        this.errService.showError('Server did not respond to create new contact. Try again later!')}
      },

      complete: () => {
        this.isFetching.set(false)
      }
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
  enteredName= '';
  enteredEmail = '';
  enteredPhone = ''
  enteredAddress = '';
  enteredTitle = '';
  enteredStatus: 'Active' | 'Inactive' = 'Active';
  enteredPhotoUrl = "" //C:\fakepath\colored-background-man-laughing_23-2147631736.jpg



  onNameChange() {
    this.initialImg.set(this.contactService.getFileName(this.enteredPhotoUrl))
  }



  onSubmit() {
    if ((this.enteredName === '' || this.enteredEmail === '' || this.enteredTitle === ''|| this.enteredPhone=== '' || this.enteredAddress=== '') ) {
      this.completed.set(false)
      this.toastr.error('All fields must be filled!');
      return
    }
    else {
      this.completed.set(true)

      const photoName:string = this.contactService.getFileName(this.enteredPhotoUrl);
      const sub = this.contactService.postContact({
        id: this.contactId,
        name: this.enteredName,
        email: this.enteredEmail,
        title: this.enteredTitle,
        phone: this.enteredPhone,
        address: this.enteredAddress,
        status: this.enteredStatus,
        photoUrl: this.enteredPhotoUrl === "" ? this.initialImg(): photoName
      }).subscribe({
        next: result => {
          this.toastr.success('Contact edited successfully');
          this.router.navigate(['/'])
        },
        error: error => {
          this.toastr.error('Failed to edit contact');
          this.error.set('Something went wrong! Please try again later!')},
      })
      this.destroyRef.onDestroy(() => sub.unsubscribe())

    }
  }


}
