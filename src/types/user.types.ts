export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Receiver extends User {
  bankAccount?: string;
  bankCode?: string;
}
export interface Sender extends User {
  bankAccount?: string;
  bankCode?: string;
}
