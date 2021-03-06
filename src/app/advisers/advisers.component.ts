import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { IClientData } from 'src/interfaces/IClient';
import { Router } from '@angular/router';
import { CSVService } from '../csv.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-advisers',
  templateUrl: './advisers.component.html',
  styleUrls: ['./advisers.component.css']
})
export class AdvisersComponent implements OnInit {

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

  ngOnInit(): void {
    const data = this.apiServer.get({ url: '/getAdvisers'});
    Promise.resolve(data).then(d => {
      this.clientsData = d["results"];
    });
  }

  /**
   * call function for client edit
   * @param id 
   * @returns User data
   */
   async editClient(id:number){
    this.modalUpdateIsHidden = !this.modalUpdateIsHidden;  
    const editClientData = await this.apiServer.post({ url: '/detailClient', data:id});
    
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
   * Save edited data
   * @param editClientData - edited client data
   * @returns redirect
   */
  async saveData(data: IClientData){
    
    if(this.clientUpdateForm.invalid) return;

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

    /* Send data to backend */
    const res = await this.apiServer.post({
      url: '/editClient',
      data: updatedUserData
    });
    
    // Refresh component
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/advisers']);
  }

  /**
   * call function for client remove
   * @param id - id of client to remove
   * @returns redirect
   */
  async removeClient(id:number){
    this.clientsService.removeClient(id);

    // Refresh component
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/advisers']);
  }

  hideModal(): void {
    this.modalUpdateIsHidden = !this.modalUpdateIsHidden;
  }

  /**
   * Export contracts to CSV
   */
   exportToCSV() {
    this.csvService.saveCSV(this.clientsData, '[Poradci] ');
  }


}
