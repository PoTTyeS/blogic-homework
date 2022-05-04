import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { IClientData } from 'src/interfaces/IClient';
import { Router } from '@angular/router';
import { CSVService } from '../csv.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  
  /* Variables */
  modalIsHidden: boolean = false;
  modalUpdateIsHidden: boolean = false;
  clientsData: any[] | undefined;
  editClientsData: IClientData = {
    id:"",
    firstName: "",
    lastName: "",
    email:"",
    mobile: "",
    rc: "",
    age: "",
    adviserStatus: "",
  };

  constructor(
    private apiServer: ApiService,
    private clientsService: ClientsService,
    private csvService: CSVService,
    private clientService: ClientService,
    private router: Router,
  ) { 
    if(this.clientService.isLogged == false)
      this.router.navigate(['/']);
  }
  
  /* New Client Form */
  clientForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    rc: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    adviserStatus: new FormControl('', [Validators.required]),
  });

  /* New Client Form for Update data */
  clientUpdateForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    rc: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    adviserStatus: new FormControl('', [Validators.required]),
  });

  /* Init function */
  ngOnInit(): void {
    const data = this.apiServer.get({ url: '/getClients'});
    
    Promise.resolve(data).then(d => {
      this.clientsData = d["results"];
    });
  }

  /**
   * call function for show editing modal and client edit form and display data into inputs
   * @param id 
   * @returns User data
   */
  editClient(id:number){
    this.modalUpdateIsHidden = !this.modalUpdateIsHidden;  
    const editClientData = this.apiServer.post({ url: '/detailClient', data:id});
    
    Promise.resolve(editClientData).then(d => {
      this.editClientsData = d["results"][0];
      this.clientUpdateForm.controls['firstName'].setValue(d["results"][0]["firstName"]);
      this.clientUpdateForm.controls['lastName'].setValue(d["results"][0]["lastName"]);
      this.clientUpdateForm.controls['email'].setValue(d["results"][0]["email"]);
      this.clientUpdateForm.controls['mobile'].setValue(d["results"][0]["mobile"]);
      this.clientUpdateForm.controls['rc'].setValue(d["results"][0]["rc"]);
      this.clientUpdateForm.controls['age'].setValue(d["results"][0]["age"]);
      this.clientUpdateForm.controls['adviserStatus'].setValue(d["results"][0]["adviserStatus"]);
      return this.editClientsData;
    });
  }

  /**
   * Edit Client
   * @param firstname First Name
   * @param lastname Last Name
   * @param email Email
   * @param mobile Mobile number
   * @param rc personal identification number
   * @param age age of client/adviser
   * @param adviserStatus identification if human is client or adviser (0 - client, 1 - adviser)
   */
  async saveData(data: IClientData){

    if(this.clientUpdateForm.invalid) return;
    
    // data of edited user
    const updatedUserData: IClientData = {
      id: this.editClientsData["id"],
      firstName: this.clientUpdateForm.value.firstName,
      lastName: this.clientUpdateForm.value.lastName,
      email: this.clientUpdateForm.value.email,
      mobile: this.clientUpdateForm.value.mobile,
      rc: this.clientUpdateForm.value.rc,
      age: this.clientUpdateForm.value.age,
      adviserStatus: this.clientUpdateForm.value.adviserStatus
    }

    // Send data to server and edit client
    const res = await this.apiServer.post({
      url: '/editClient',
      data: updatedUserData
    });

    // Refresh component
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/clients']);
  }

  /**
   * call function for client delete
   * @param id 
   * @returns - redirect
   */
  async removeClient(id:number){
    this.clientsService.removeClient(id);

    // Refresh component
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/clients']);
  }

  /**
   * Show/Hide Modal for creating/editing Clients
   */
  showModal(): void {
    this.modalIsHidden = !this.modalIsHidden;
  }
  hideModal(): void {
    this.modalUpdateIsHidden = !this.modalUpdateIsHidden;
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
   * @returns redirect
   */
  onSubmit(){

    if(this.clientForm.invalid) return;
    
    // future client data
    const userData: any = {
      id:"",
      firstName: this.clientForm.value.firstName,
      lastName: this.clientForm.value.lastName,
      email: this.clientForm.value.email,
      mobile: this.clientForm.value.mobile,
      rc: this.clientForm.value.rc,
      age: this.clientForm.value.age,
      adviserStatus: this.clientForm.value.adviserStatus
    };
    
    // call function for creating client
    this.clientsService.createClient(userData);
    
    // Refresh component
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/clients']);
  }

  /**
   * Export contracts to CSV
   */
   exportToCSV() {
    this.csvService.saveCSV(this.clientsData, '[Klienti] ');
  }

}
