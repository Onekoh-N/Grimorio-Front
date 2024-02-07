import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavBarComponent } from '../Nav-bar/nav-bar.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { NgClass } from '@angular/common';
import { UserData } from '../auth/Interfaces/userData.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, RouterOutlet, RouterLink, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  //VARIABLES
  isLogged = false;
  userData = {
    userName: 'S/D',
    email: 'S/D',
    rol: 'S/D'
  };
  //


  //CONSTRUCTOR
  constructor(private  _authService: AuthService, private _router: Router) {}
  //

  //ON-INIT
  ngOnInit(): void {
    this.isLogged = (localStorage.getItem('token')) ? true : false;
    const user = localStorage.getItem('user');
    if (localStorage.getItem('user')){
      this.userData = JSON.parse(user as string) as UserData
    }
  }



  //LOGOUT
  logOut() {
  this._authService.logout();
  this._router.navigate(['/login']);
  }
  //

// ON-DESTROY
  ngOnDestroy(): void {
    this.isLogged = false;
    this.userData = {
      userName: 'S/D',
      email: 'S/D',
      rol: 'S/D'
    };
  }
}
