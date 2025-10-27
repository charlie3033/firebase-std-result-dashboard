import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  imports: [CommonModule,FormsModule],
  templateUrl: './dash.html',
  styleUrl: './dash.css',
})
export class Dash {
  selectedTab: 'profile' | 'result' = 'profile';
  student: any= {};
  courses: any[] = [];
  result: any;
  total = 0;
  maxTotal = 0;
  percentage = 0;

  private baseUrl = 'http://localhost:3000/api';
  constructor(private cdr: ChangeDetectorRef,private http: HttpClient,private router: Router){}

  ngOnInit(){
    const stored = localStorage.getItem('student');
    if(!stored){
      alert('Token expired. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }
    this.student = JSON.parse(stored);
    console.log('student',this.student);
    this.loadCourses();
    this.loadResult();
  }

  loadCourses(){
    this.http.get<any[]>(`${this.baseUrl}/courses?department=${this.student.department}&semester=${this.student.semester}`)
    .subscribe({
      next: (data) => {
        this.courses = data ;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading courses:', err),

    });
  }

  loadResult(){
    this.http.get<any>(`${this.baseUrl}/results/${this.student.id}`)
      .subscribe({
        next: (data) => {
          this.result = data[0];
          console.log(this.result);
          if(this.result){
            this.total = this.result.subjects.reduce((sum: number, s: any) => sum + s.marks, 0);
            this.maxTotal = this.result.subjects.reduce((sum: number, s: any) => sum + s.maxMarks, 0);
            this.percentage = parseFloat(((this.total / this.maxTotal) * 100).toFixed(2));
          }
          this.cdr.detectChanges();
        },error: (err)=>console.error('Error Loading result:', err)
      });
  }

  printResult(){
    window.print();
  }

  logout(){
    localStorage.removeItem('student');
    this.router.navigate(['/login']);
  }

  getGrade(marks: number): string{
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 50) return 'C';
    if (marks >= 36) return 'D';
    return 'F';
  }

}
