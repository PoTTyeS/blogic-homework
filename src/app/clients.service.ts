import { Injectable } from '@angular/core';
import { IClientData } from 'src/interfaces/IClient';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private apiServer: ApiService
  ) { }

  /**
   * Remove Client
   * @param id 
   */
  async removeClient(id: number){
    const data = await this.apiServer.post({
      url: '/removeClient',
      data: id
    });
  }


  async createClient(data: IClientData){
    const userData = await this.apiServer.post({
      url: '/createClient',
      data: data
    });
  }

}
