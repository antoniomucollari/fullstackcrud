import {Component, DestroyRef, EventEmitter, inject, Output, signal} from '@angular/core';
import {ContactCardComponent} from "./contact-card/contact-card.component";
import {Contact} from "./contacts.model";
import {ContactsService} from "./contacts.service";
import {RouterLink} from "@angular/router";
import {LoadingContainerComponent} from "../shared/loading-container/loading-container.component";
import {FormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {ErrorService} from "../shared/error.service";
@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    ContactCardComponent,
    RouterLink,
    LoadingContainerComponent,
    FormsModule,

  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  private subscription: Subscription | undefined;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages = 0;
  isFetching = signal(false)
  error = signal('')
  private contactService = inject(ContactsService);
  private destroyRef = inject(DestroyRef);
  private errService = inject(ErrorService);
  contacts = this.contactService.loadedContacts
  enteredPageSize= this.pageSize;


  getContacts() {
    console.log(this.currentPage, this.totalPages)

    const subscription = this.contactService.fetchContacts(this.currentPage, this.enteredPageSize).subscribe({
      next: result => {
        this.contactService.contacts.set(result.content)
        this.contactService.totalContacts.set(result.totalElements)
        this.totalPages = result.totalPages

      },
      error: error => {
        const errMsg = 'Server did not respond to fetch contacts. Try again later!'
        this.errService.showError(errMsg!)
        this.error.set(errMsg)},

      complete: () =>this.isFetching.set(false)
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
  constructor() {
    this.isFetching = signal(true)
    this.getContacts()
  }
  ngOnInit() {
    this.subscription = this.contactService.refreshContacts$.subscribe(() => {
      this.isFetching = signal(true)
      this.getContacts();  // Refresh the contacts list
    });
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.contactService.totalContacts() / this.pageSize) - 1) {
      this.currentPage++;
      this.isFetching = signal(true)
      this.getContacts();
    }
  }
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.isFetching = signal(true)
      this.getContacts();
    }
  }

  onChangePageSize() {
    this.pageSize = this.enteredPageSize
    while(this.currentPage+1 > Math.ceil(this.contactService.totalContacts() / this.pageSize)){
      this.previousPage()
    }
    this.isFetching = signal(true)
    this.getContacts()
  }
}
