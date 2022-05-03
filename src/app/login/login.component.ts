import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from "@angular/router"
import { ApiService } from '../api.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private apiServer: ApiService,
    private clientService: ClientService
  ) { };

    logStatus:number;

  ngOnInit(): void { 
  };

  /* Login Form */
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  async onSubmit(){
    // Data from Login form
    let userData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    
    // Post Request call 
    const data = await this.apiServer.post({
      url: '/login',
      data: userData
    });
    if(data["status"] == 0){
      this.logStatus = 1;
    } else {
      // Save data into localStorage
      this.clientService.initClientData(data);
          
      // Redirect
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/contracts']);
    }
  };
};

