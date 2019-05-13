import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  bookForm: FormGroup;
  driver:string='';
  destination:string='';
  description:string='';
  amount:string='';
  time:string='';
  meeting:string='';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
    this.bookForm = this.formBuilder.group({
      'driver' : [null, Validators.required],
      'destination' : [null, Validators.required],
      'description' : [null, Validators.required],
      'amount' : [null, Validators.required],
      'time' : [null, Validators.required],
      'meeting' : [null, Validators.required]
    });
  }

  getBook(id) {
    this.api.getBook(id).subscribe(data => {
      this.driver = data._id;
      this.bookForm.setValue({
        driver: data.isbn,
        destination: data.title,
        description: data.description,
        amount: data.author,
        time: data.publisher,
        meeting: data.published_year
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.updateBook(this.driver, form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/book-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  bookDetails() {
    this.router.navigate(['/book-details', this.driver]);
  }
}
