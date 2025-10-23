import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
  pageTitle = 'Admin Dashboard';
activeTab: string = 'dashboard';


// mock stats
stats = {
totalStudents: 1247,
activeCourses: 89,
pendingGrades: 156,
systemAlerts: 3
};


// sample timetables (would normally come from an API)
timetables = [
{ title: 'Computer Science - 3rd Semester', date: '2024-03-15', status: 'Active' },
{ title: 'Electrical Engineering - 2nd Semester', date: '2024-03-14', status: 'Pending' },
{ title: 'Mechanical Engineering - 4th Semester', date: '2024-03-13', status: 'Active' }
];

// sample students
students = [
{ id: 'CS001', name: 'John Doe', course: 'Computer Science', year: '3rd Year', gpa: 3.85, status: 'Active' },
{ id: 'EE002', name: 'Jane Smith', course: 'Electrical Engineering', year: '2nd Year', gpa: 3.92, status: 'Active' },
{ id: 'ME003', name: 'Mike Johnson', course: 'Mechanical Engineering', year: '4th Year', gpa: 3.67, status: 'Probation' }
];


constructor(private host: ElementRef<HTMLElement>) {}


showTab(tabName: string, event?: Event) {
this.activeTab = tabName;
this.pageTitle = {
'dashboard': 'Admin Dashboard',
'timetables': 'Timetable Management',
'grades': 'Grade Management',
'students': 'Student Management',
'reports': 'Reports & Analytics'
}[tabName] || 'Admin Dashboard';


// prevent default anchor navigation
if (event) event.preventDefault();


// scroll to top of content area for nicer UX
const el = this.host.nativeElement.querySelector('.main-content');
if (el) el.scrollTop = 0;
}
// file input change handler
onFileChange(input: HTMLInputElement) {
const file = input.files?.[0];
const labelSpan = input.closest('.file-upload-area')?.querySelector('.file-info') as HTMLElement | null;
if (labelSpan) labelSpan.textContent = file?.name || 'Supports PDF, CSV, Excel files';
}


// mock save student grade
saveStudentChanges(studentId: string) {
console.log('Save called for', studentId);
alert('Changes saved for ' + studentId);
}


// mock generate report
generateReport(kind: string) {
alert('Report generated: ' + kind);
}
}
