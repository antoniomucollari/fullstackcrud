export interface Contact {
  id: string;
  name: string;
  email: string;
  title: string;
  phone: string;
  address: string;
  status: 'Active' | 'Inactive';
  photoUrl: string;
}
export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Current page number
  first: boolean;
  last: boolean;
  numberOfElements: number;
}
