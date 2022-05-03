import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged: boolean = false;

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.isLogged = this.clientService.isLogged;
  }

}
