import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { ApiService } from '../api.service';
import { ClientsService } from '../clients.service';
import { IContractData } from 'src/interfaces/IContract';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

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
  contractsData: any;
  conctractDataNew: any;

  constructor(
    private apiServer: ApiService,
    private clientsService: ClientsService,
    private router: Router,
  ) { }

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

  async ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Item1' },
      { item_id: 2, item_text: 'Item2' },
      { item_id: 3, item_text: 'Item3' },
      { item_id: 4, item_text: 'Item4' },
      { item_id: 5, item_text: 'Item5' }
    ];
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
    };
    const data = await this.apiServer.get({ url: '/contracts'});
    this.contractsData = data?.results;
    console.log('LOLO', this.contractsData);
  }

  /**
   * Show add contract modal form
   */
  showModal(): void {
    this.modalIsHidden = !this.modalIsHidden;
  }

  /**
   * Add contract to the database
   * @param contractsData data submited in contract form
   */
  addContract(){
    this.conctractDataNew = {
      registrationNumber: this.contractForm.value.registrationNumber,
      institution: this.contractForm.value.institution,
      client: this.contractForm.value.client,
      dateClosed: this.contractForm.value.dateClosed,
      dateExpiration: this.contractForm.value.dateExpiration,
      dateEnd: this.contractForm.value.dateEnd,
      contractMembers: this.contractForm.value.contractMembers,
      contractManager: this.contractForm.value.contractManager,
    }
  
    console.log(this.conctractDataNew)
    /*
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/contracts']);
    */
  }

  /**
   * Remove contract
   * @param id - id of contract 
   * @returns - redirect and it shows that data were removed
   * */
  async removeContract(id:number){
    await this.apiServer.post({ url: '/removeContract', data: id });
    
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/contracts']);
  }
}
