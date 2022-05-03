import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContractData } from 'src/interfaces/IContract';
import { ApiService } from '../api.service';

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
    private route: ActivatedRoute
  ) { }

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
    
    // Getting data from JSON string
    Promise.resolve(data).then(d => {
      console.log(d["results"][0]);
      this.detailContractData = d["results"][0];
    });
  
    // return data
      return this.detailContractData;
  }

}
