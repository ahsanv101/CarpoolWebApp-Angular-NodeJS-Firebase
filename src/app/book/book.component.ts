import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

declare function listAllUsers(nextPageToken: any): any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class ShowUserComponent implements OnInit {
  item: any;
  books: any;
  displayedColumns = ['isbn', 'title', 'author'];
  dataSource = new BookDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {
    listAllUsers(null);
    // this.item = new listAllUsers(null);
    // console.log(this.item);
    // this.api.getBooks()
    //   .subscribe(res => {
    //     console.log(res);
    //     this.books = res;
    //   }, err => {
    //     console.log(err);
    //   });
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
