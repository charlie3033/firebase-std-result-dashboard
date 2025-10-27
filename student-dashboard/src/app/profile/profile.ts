import { Component, inject } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private service = inject(StudentService);
  private http = inject(HttpClient);
  private router = inject(Router);

  student: any = null;
  subjects: any[] = [];
  total = 0;
  maxTotal = 0;
  percentage = 0;
  status = '';
  error = '';

  ngOnInit() {
    // this.service.getProfile().subscribe(res => this.student = res);
    this.loadResult();
  }

  async loadResult(){
    const storedStudent = localStorage.getItem('student');
    if(!storedStudent){
      this.router.navigate(['/login']);
      return;
    }

    this.student = JSON.parse(storedStudent);

    try{
      const results:any = await this.http
        .get(`http://localhost:3000/api/results/${this.student.id}`)
        .toPromise();

        if(!results || results.length === 0){
          this.error = 'No result found';
          return;
        }

        const result = results[0];
        this.subjects = result.subjects || [];

        this.total = this.subjects.reduce((sum, sub) => sum + sub.marks, 0);
        this.maxTotal = this.subjects.reduce((sum, sub) => sum + sub.maxMarks, 0);
        this.percentage = parseFloat(((this.total / this.maxTotal) * 100).toFixed(2));
        this.status = result.status || (this.percentage >= 40 ? 'Pass' : 'Fail');
    }catch(err:any){
      this.error = err?.message || 'failed to fetch results';
    }
  }

  logout(){
    localStorage.removeItem('student');
    this.router.navigate(['/login']);
  }

  printResult(){
    window.print();
  }
}
