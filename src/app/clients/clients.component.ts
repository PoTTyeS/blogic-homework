import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { IClientData } from 'src/interfaces/IClient';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  
  /* Variables */
  modalIsHidden: boolean = false;
  clientsData: any[] | undefined;

  constructor(
    private apiServer: ApiService,
    private clientsService: ClientsService
  ) { }
  
  /* New Client Form */
  clientForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    rc: new FormControl(''),
    age: new FormControl(''),
    adviserStatus: new FormControl(''),
  });

  ngOnInit(): void {
    const data = this.apiServer.get({ url: '/getClients'});
    
    Promise.resolve(data).then(d => {
      this.clientsData = d["results"];
    });
  }

  /**
   * call function for client edit
   * @param id 
   */
  editClient(id:number){
    console.log("Editace klienta s id: " + id);
  }

  /**
   * call function for client delete
   * @param id 
   */
  async removeClient(id:number){
    this.clientsService.removeClient(id);
  }

  /**
   * Show/Hide Modal
   */
  showModal(): void {
    this.modalIsHidden = !this.modalIsHidden;
  }

  /**
   * Add Client/Adviser
   * @param firstname First Name
   * @param lastname Last Name
   * @param email Email
   * @param mobile Mobile number
   * @param rc personal identification number
   * @param age age of client/adviser
   * @param adviserStatus identification if human is client or adviser (0 - client, 1 - adviser)
   * 
   */
  async onSubmit(){
    
    const userData: IClientData = {
      firstName: this.clientForm.value.firstName,
      lastName: this.clientForm.value.lastName,
      email: this.clientForm.value.email,
      mobile: this.clientForm.value.mobile,
      rc: this.clientForm.value.rc,
      age: this.clientForm.value.age,
      adviserStatus: this.clientForm.value.adviserStatus
    }

    this.clientsService.createClient(userData);
  }

}
