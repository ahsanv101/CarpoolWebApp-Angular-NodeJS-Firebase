import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class ShowUserComponent implements OnInit {
  users: any;

  constructor(private api: ApiService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/users')
      .subscribe(res => {
        this.users = res;
      });
  }

}