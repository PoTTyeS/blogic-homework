import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../clients.service';
import { ApiService } from '../api.service';
import { IClientData } from 'src/interfaces/IClient';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})

export class ClientDetailComponent implements OnInit {

  /* Variables */
  id: any;
  detailData: IClientData = {
    id: "",
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
    const data = await this.apiServer.post({ url: '/detailClient', data:id});
    
    // Getting data from JSON string
    Promise.resolve(data).then(d => {
      this.detailData = d["results"][0];
    });
  
    // return data
    return this.detailData;

  }

}
