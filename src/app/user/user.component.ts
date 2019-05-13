import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';


@Component({
  selector: 'app-book',
  templateUrl: './user.component.html',
  styleUrls: ['./user.scss']
})

export class BookComponent implements OnInit {

  books: any;
  displayedColumns = ['isbn', 'title', 'author'];
  dataSource = new BookDataSource(this.api);
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    private api: ApiService,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.api.getBooks()
      .subscribe(res => {
        console.log(res);
        this.books = res;
      }, err => {
        console.log(err);
      });
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['/login']);
      }, (error) => {
        console.log("Logout error", error);
      });
  }

  showUsers() {
    this.router.navigate(['/books']);
  }

}

export class BookDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getBooks();
  }

  disconnect() {

  }


}
