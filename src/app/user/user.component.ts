import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  Users: any = [];
  rowData = [];
  constructor(
    public userService: UserService
  ) { }

  columnDefs = [
    {headerName: 'Name', field: 'firstName',sortable: true,filter: true,resizable: true },
    {headerName: 'Surname', field: 'lastName',sortable: true,filter: true,resizable: true},
    {headerName: 'Date Of Birth', field: 'dateOfBirth',sortable: true,resizable: true},
    {headerName: 'Email Address', field: 'emailAddress',sortable: true,resizable: true},
    {headerName: 'Address', field: 'address',resizable: true},
    {headerName: 'City', field: 'city',sortable: true,resizable: true},
    {headerName: 'Country', field: 'country',sortable: true,resizable: true},
    {headerName: 'Zip Code', field: 'zipCode',resizable: true}
   
  ];
  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers() {
    return this.userService.getUsers().subscribe((res: {}) => {
      this.Users = res;
      this.rowData = this.Users.users;
    })
  }
  onRowClicked(event: any) {
    ($('#imagemodal') as any).modal('show');
  }
}
