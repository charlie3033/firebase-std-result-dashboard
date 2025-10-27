import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StudentService } from '../services/student.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.html',
  styleUrl: './result.css',
})
export class Result {
  private service = inject(StudentService);
  private http = inject(HttpClient);
  result: any;
  private baseUrl = 'http://localhost:3000/api/students';

  ngOnInit() {
    this.getResult().subscribe(res => this.result = res);
  }

  getResult(){
    const token = localStorage.getItem('student');
    return this.http.get(`${this.baseUrl}/result`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  printResult() {
    window.print();
  }
}
