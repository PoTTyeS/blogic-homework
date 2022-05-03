import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { ApiService } from '../api.service';
import { ClientsService } from '../clients.service';
import { IContractData } from 'src/interfaces/IContract';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { CSVService } from '../csv.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})

export class ContractsComponent implements OnInit {

  /* Variables */
  dropdownList: any = [];
  dropdownSettings:IDropdownSettings={};
  modalIsHidden: boolean = false;
  modalIsHidden1: boolean = false;
  contractsData: any;
  conctractDataNew: any;
  conctractsDataEdited: any = {
    id: "",
    registrationNumber: "",
    institution: "",
    client: "",
    dateClosed: "",
    dateExpiration: "",
    dateEnd: "",
    contractMembers: "",
    contractManager: "",
  };

  constructor(
    private apiServer: ApiService,
    private clientService: ClientService,
    private router: Router,
    private csvService: CSVService
  ) { 
    if(this.clientService.isLogged == false)
      this.router.navigate(['/']);
  }

  /* Contract form  */
  contractForm = new FormGroup({
    registrationNumber: new FormControl(''),
    institution: new FormControl(''),
    client: new FormControl(''),
    dateClosed: new FormControl(''),
    dateExpiration: new FormControl(''),
    dateEnd: new FormControl(''),
    contractMembers: new FormControl(''),
    contractManager: new FormControl(''),
  });

  /* Contract edit form */
  contractUpdateForm = new FormGroup({
    registrationNumber: new FormControl(''),
    institution: new FormControl(''),
    client: new FormControl(''),
    dateClosed: new FormControl(''),
    dateExpiration: new FormControl(''),
    dateEnd: new FormControl(''),
    contractMembers: new FormControl(''),
    contractManager: new FormControl(''),
  });

  async ngOnInit() {
    const clients = await this.apiServer.get({ url: '/clients'});

    const tempList: any = [];
    /* Loop through all items in clients.results and push it to the tempList as an object */
    clients.results.map((client: any) => {
      tempList.push({
        item_id: client.id, 
        item_text: `${client.firstName} ${client.lastName}`
      });
    });

    this.dropdownList = tempList;

    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
    };

    /* Getting data for display all contracts */
    const data = await this.apiServer.get({ url: '/contracts'});
    this.contractsData = data?.results;
    this.contractsData.map((item: any) => {
      item.members = JSON.parse(item.members);
      item.manager = JSON.parse(item.manager);
      return item;
    });
  }

  /**
     * call function for show editing modal and client edit form and display data into inputs
     * @param id 
     * @returns User data
     */
  editContract(id:number){
    this.modalIsHidden1 = !this.modalIsHidden1;  
    const conctractDataEdited = this.apiServer.post({ url: '/detailContract', data:id});
    
    Promise.resolve(conctractDataEdited).then(d => {
      this.conctractsDataEdited = d.results[0];
      this.contractUpdateForm.controls['registrationNumber'].setValue(d.results[0].registration_number);
      this.contractUpdateForm.controls['institution'].setValue(d.results[0].institution);
      this.contractUpdateForm.controls['client'].setValue(d.results[0].client);
      this.contractUpdateForm.controls['dateClosed'].setValue(d.results[0].date_closed);
      this.contractUpdateForm.controls['dateExpiration'].setValue(d.results[0].date_expiration);
      this.contractUpdateForm.controls['dateEnd'].setValue(d.results[0].date_end);
      this.contractUpdateForm.controls['contractMembers'].setValue(JSON.parse(d.results[0].members));
      this.contractUpdateForm.controls['contractManager'].setValue(JSON.parse(d.results[0].manager));
      return this.conctractsDataEdited;
    });
  }


  /**
   * Show add contract modal form
   */
  showModal(): void {
    this.modalIsHidden = !this.modalIsHidden;
  }
  hideModal(): void {
    this.modalIsHidden1 = !this.modalIsHidden1;
  }

  /**
   * Add contract to the database
   * @param conctractDataNew data submited in contract form
   * @returns - redirect and it shows that data were added
   */
  addContract(){
    this.conctractDataNew = {
      registrationNumber: this.contractForm.value.registrationNumber,
      institution: this.contractForm.value.institution,
      client: this.contractForm.value.client,
      dateClosed: this.contractForm.value.dateClosed,
      dateExpiration: this.contractForm.value.dateExpiration,
      dateEnd: this.contractForm.value.dateEnd,
      contractMembers: JSON.stringify(this.contractForm.value.contractMembers),
      contractManager: JSON.stringify(this.contractForm.value.contractManager),
    }
  
    this.apiServer.post({ url: '/createContract', data: this.conctractDataNew });
    
    /* Redirect */
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/contracts']);
  }

  /**
   * Edit contract to the database
   * @param conctractDataNew data submited in contract form
   * @returns - redirect and it shows that data were added
   * */
  async saveData(data:any){

    // data of edited user
    const editedContractData = {
      id: this.conctractsDataEdited["id"],
      registrationNumber: this.contractUpdateForm.value.registrationNumber,
      institution: this.contractUpdateForm.value.institution,
      client: this.contractUpdateForm.value.client,
      dateClosed: this.contractUpdateForm.value.dateClosed,
      dateExpiration: this.contractUpdateForm.value.dateExpiration,
      dateEnd: this.contractUpdateForm.value.dateEnd,
      contractMembers: JSON.stringify(this.contractUpdateForm.value.contractMembers),
      contractManager: JSON.stringify(this.contractUpdateForm.value.contractManager)
    }

    // Send data to server and edit client
    const res = await this.apiServer.post({
      url: '/updateContract',
      data: editedContractData
    });

    // Refresh component
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/contracts']);
  }

  /**
   * Remove contract
   * @param id - id of contract 
   * @returns - redirect and it shows that data were removed
   * */
  removeContract(id:number){
    /* Post data into backend */
    this.apiServer.post({ url: '/removeContract', data: id });
    
    /* Redirect */
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/contracts']);
  }

  /**
   * Export contracts to CSV
   */
  exportToCSV() {
    this.csvService.saveCSV(this.contractsData, '[Smlouvy] ');
  }

}
