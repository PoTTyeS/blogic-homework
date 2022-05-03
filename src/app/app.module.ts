import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Components */
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { AddContractComponent } from './add-contract/add-contract.component';
import { ContractsComponent } from './contracts/contracts.component';
import { AdvisersComponent } from './advisers/advisers.component';
import { HttpClientModule } from '@angular/common/http';
import { EditContractComponent } from './edit-contract/edit-contract.component';
import { LogoutComponent } from './logout/logout.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientDetailComponent,
    ContractsComponent,
    ContractDetailComponent,
    MenuComponent,
    LoginComponent,
    AddContractComponent,
    AdvisersComponent,
    EditContractComponent,
    LogoutComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    /* Router */
    RouterModule.forRoot([
      {path: 'clients', component: ClientsComponent},
      {path: 'clients/detail/:id', component: ClientDetailComponent},
      {path: 'advisers', component: AdvisersComponent},
      {path: 'contracts', component: ContractsComponent},
      {path: 'contract/detail/:id', component: ContractDetailComponent},
      {path: 'add-contract', component: AddContractComponent},
      {path: 'edit-contract', component: EditContractComponent},
      {path: 'logout', component: LogoutComponent},
      {path: '', component: LoginComponent},
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
