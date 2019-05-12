import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Observable} from 'rxjs'; 
//import 'rxjs/add/operator/toPromise';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ShowUserComponent } from './book/book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


import {LoginPageModule} from './login-page/login-page.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageModule} from './dashboard-page/dashboard-page.module';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {NeedAuthGuard} from './auth.guard';

import { LoginComponent } from './login/login.component';
import { BookComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';

import { rootRouterConfig } from './app.routes';


import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';



import {
  
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from "@angular/material";

// const appRoutes: Routes = [

  // {
  //   path: 'books',
  //   component: BookComponent,
  //   data: { title: 'Book List' }
  // },
  // {
  //   path: 'book-details/:id',
  //   component: BookDetailComponent,
  //   data: { title: 'Book Details' }
  // },
  // {
  //   path: 'book-create',
  //   component: BookCreateComponent,
  //   data: { title: 'Create Book' }
  // },
  // {
  //   path: 'book-edit/:id',
  //   component: BookEditComponent,
  //   data: { title: 'Edit Book' }
  // }
  // // { path: '',
  // //   redirectTo: '/books',
  // //   pathMatch: 'full'
  // // }
// ];

@NgModule({
  declarations: [
    LoginComponent,
    BookComponent,
    RegisterComponent,
    AppComponent,
    BookComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookEditComponent,
    ShowUserComponent
    // LoginPageComponent,
    // DashboardPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    LoginPageModule,
    DashboardPageModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [
   AuthService, UserService, UserResolver, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
