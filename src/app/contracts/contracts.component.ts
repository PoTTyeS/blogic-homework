import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { ApiService } from '../api.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})

export class ContractsComponent implements OnInit {

  modalIsHidden: boolean = false;

  constructor() {
  }

  ngOnInit(): void {

  }

  showModal(): void {
    this.modalIsHidden = !this.modalIsHidden;
  }
}
