import {Routes} from "@angular/router";
import {ContactsComponent} from "./app/contacts/contacts.component";
import {EditContactComponent} from "./app/contacts/edit-contact/edit-contact.component";

const routeConfig: Routes = [
  {
    path: '',
    component: ContactsComponent,
    title: 'Contacts',
  },
  {
    path: 'edit-contact/:id',
    component: EditContactComponent,
    title: 'Edit Contact',
  }
]
export default routeConfig;
