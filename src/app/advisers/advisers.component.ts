import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-advisers',
  templateUrl: './advisers.component.html',
  styleUrls: ['./advisers.component.css']
})
export class AdvisersComponent implements OnInit {

  clientsData: any[] | undefined;

  constructor(
    private apiServer: ApiService,
    private clientsService: ClientsService
  ) { }
  

  ngOnInit(): void {
    const data = this.apiServer.get({ url: '/getAdvisers'});
    Promise.resolve(data).then(d => {
      this.clientsData = d["results"];
    });
  }

  editClient(id:number){
    console.log("Editace poradce s id: " + id);
  }

  async removeClient(id:number){
    this.clientsService.removeClient(id);
  }

}
