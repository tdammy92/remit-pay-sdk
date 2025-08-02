export interface User {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface Receiver extends User {
  bankAccount: string;
  bankCode?: string;
}
export interface Sender extends User {
  bankAccount: string;
  bankCode?: string;
}
