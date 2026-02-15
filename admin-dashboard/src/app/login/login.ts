import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username='';
  password='';
  email = '';
  constructor(private http: HttpClient,private router: Router,private auth: AuthService){}

  onSubmit(){
    // const credentials = {
    //   username: this.username,
    //   password: this.password
    // };

    // this.http.post<any>(`${environment.apiUrl}/admin/login`, credentials).subscribe({
    //   next: res => {
    //     this.email = res.email;
        this.auth.login(this.username, this.password)
        .then(() => {
          // localStorage.setItem('token', res.token);
          localStorage.setItem('adminname',this.username);
          this.router.navigate(['/admin/dashboard']);
        }).catch(err =>alert('Invalid credentials'));

        // localStorage.setItem('token', res.token);
        // localStorage.setItem('adminname',this.username);
        // this.router.navigate(['/admin/dashboard']);
    //   },error: ()=>{
    //     alert('Invalid credentials');
    //   }
    // });
  }
}
