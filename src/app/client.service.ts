import { Injectable } from '@angular/core';
import { IClient } from 'src/interfaces/IClient';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  isLogged: boolean = false;
  constructor() {
    if((window.localStorage.getItem('token') || "").length > 0) {
      this.isLogged = true;
    }
  }

  /* Function for save user data into localStorage */
  initClientData(data: IClient) {
    if(!data.token) return;
    window.localStorage.setItem('token', data.token);
    window.localStorage.setItem('data', JSON.stringify(data.data));
    this.isLogged = true;
  };

  clearClientData(){
    window.localStorage.setItem('token', "");
    window.localStorage.setItem('data', "");
    this.isLogged = false;
  }

  /* Get user data function */
  getClientData() {
    return JSON.parse(window.localStorage.getItem('data') || "{}");
  };
};