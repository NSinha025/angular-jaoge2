import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  // Method to handle login, redirect to the seat layout page
  onLogin() {
    if (this.username && this.password) {
      // For now, we just redirect without actual authentication
      localStorage.setItem('username', this.username);  // Save username in local storage
      this.router.navigate(['/seat-layout']);
    } else {
      alert('Please enter username and password.');
    }
  }
}
