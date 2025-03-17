import { MatInputModule } from '@angular/material/input';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

export interface Office {
  Office_code: string;
  Office_id: string;
  Office_Name: string;
}

@Component({
  selector: 'app-view-office-modal-component',
  templateUrl: './view-office-modal-component.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  styleUrls: ['./view-office-modal-component.component.css']
})
export class ViewOfficeModalComponentComponent implements OnInit {
  displayedColumns: string[] = [
    'employee_code',
    'employee_name',
    'preferred_office',
    'preference_order',
    'priority_value',
    'cader',
    'action',
  ];
  dataSource = new MatTableDataSource<any>();
  searchQuery: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewOfficeModalComponentComponent>,
    private http: HttpClient // Inject HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  fetchData(): void {
    const apiUrl = `http://192.168.1.39:9090/api/v0/gen_queue_list?office_id=${this.data.officeCode}&cader=${this.data.cader}`;

    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('API Error:', err);
        alert('Failed to fetch data. Please try again.');
      },
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }

  selectOffice(office: any): void {
    this.dialogRef.close(office);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
