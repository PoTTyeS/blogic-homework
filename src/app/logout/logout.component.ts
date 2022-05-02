import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { ClientService } from '../client.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientService.clearClientData();
    this.router.navigate(['/']);
  }

}
