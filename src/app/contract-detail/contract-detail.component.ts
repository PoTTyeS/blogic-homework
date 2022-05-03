import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContractData } from 'src/interfaces/IContract';
import { ApiService } from '../api.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {

  id:any;
  detailContractData: IContractData = {
    id:"",
    registration_number: "",
    institution: "",
    client: "",
    date_closed: "",
    date_expiration: "",
    date_end: "",
    members: "",
    manager: "",
  };

  constructor(
    private apiServer: ApiService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router,
  ) { 
    if(this.clientService.isLogged == false)
      this.router.navigate(['/']);
  }

  ngOnInit(): void { 

    // Get id 
    this.id = this.route.snapshot.paramMap.get('id');
  
    // Call function for getting data of client/adviser
    this.getDetail(this.id);

  }

  /**
  * 
  * @param id 
  * @returns detailData - client's / adviser's personal info
  */
  async getDetail(id: any){
    
    // call function that send id to server and server returns data of client/adviser
    const data = await this.apiServer.post({ url: '/detailContract', data:id});
    
    this.detailContractData = data.results[0];
    this.detailContractData.members = JSON.parse(data.results[0].members);
    this.detailContractData.manager = JSON.parse(data.results[0].manager);

    console.log(this.detailContractData)
    for(const item of this.detailContractData.members) {
      console.log(item);
    }
  
    // return data
    return this.detailContractData;
  }

}
