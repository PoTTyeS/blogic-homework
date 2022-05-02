import { Injectable } from '@angular/core';
import { IClient } from 'src/interfaces/IClient';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor() { }

  /* Function for save user data into localStorage */
  initClientData(data: IClient) {
    window.localStorage.setItem('token', data.token);
    window.localStorage.setItem('data', JSON.stringify(data.data));
  };

  clearClientData(){
    window.localStorage.setItem('token', "");
    window.localStorage.setItem('data', "");
  }

  /* Get user data function */
  getClientData() {
    return JSON.parse(window.localStorage.getItem('data') || "{}");
  };

};