import {inject, Injectable, signal} from "@angular/core";
import {Contact, Page} from "./contacts.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, Subject, tap, throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class ContactsService {
  totalContacts = signal(0);
  contacts = signal<Contact[]>([]);
  private httpClient = inject(HttpClient);
  loadedContacts = this.contacts.asReadonly();
  private refreshContactsSource = new Subject<void>();
  refreshContacts$ = this.refreshContactsSource.asObservable();

  // Method to trigger the refresh event
  triggerRefreshContacts() {
    this.refreshContactsSource.next();
  }


  postContact(contact: Contact) {
    return this.httpClient.post<Contact>('http://localhost:8080/contacts', contact)
      .pipe(catchError(err=> {
        return throwError(() => new Error('Backend server failed!: ',err))
      })
    )
  }

  fetchContacts(currentPage:number, pageSize:number) {
    const params = new HttpParams()
      .set('page', currentPage.toString())
      .set('size', pageSize.toString());
    return this.httpClient.get<Page<Contact>>("http://localhost:8080/contacts",{params}).pipe(
      // map(resData => resData.content),
      catchError(error=>{
        return throwError(()=>new Error("Backend server failed!"));
      }))
  }

  getContact(id:string){
    return this.httpClient.get<Contact>(`http://localhost:8080/contacts/${id}`)
  }

  getFileName(filePath:String): string{
    if (filePath === '') {
      return 'http://localhost:8080/contacts/image/' + 'random.jpg'
    }
    return 'http://localhost:8080/contacts/image/' + filePath.split('\\').pop() || 'http://localhost:8080/contacts/image/' + 'random.jpg';
  }

  deleteContact(id: string) {
    const prevContact = this.contacts();
    return this.httpClient.delete("http://localhost:8080/contacts/" + id,{responseType: 'text'})
      .pipe(
        catchError(error => {

          this.contacts.set(prevContact);
          console.error('Backend server failed:', error.message);
          return throwError(() => new Error('Backend server failed!: ' + error.message));
        })
      );
  }

}
