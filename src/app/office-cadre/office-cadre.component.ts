import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewOfficeModalComponentComponent } from '../view-office-modal-component/view-office-modal-component.component';

@Component({
  selector: 'app-office-cadre',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './office-cadre.component.html',
  styleUrls: ['./office-cadre.component.css'],
})
export class OfficeCadreComponent implements AfterViewInit {
  model = {
    office: '',
    officeCode: '',
    cader: '', // cader Name
  };

  displayedColumns: string[] = [
    'employee_code',
    'employee_name',
    'preferred_office',
    'preference_order',
    'priority_value',
    'cader',
  ];
  dataSource = new MatTableDataSource<any>([]);

  allCader: { name: string; code: string }[] = [
    { name: 'ASST', code: 'CADer001' },
    { name: 'AM', code: 'CADer002' },
    { name: 'MGR', code: 'CADer003' },
    { name: 'OA', code: 'CADer004' },
    { name: 'PTS', code: 'CADer005' },
    { name: 'Others', code: 'CADer006' },
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  selectText(event: Event): void {
    const dialogRef = this.dialog.open(ViewOfficeModalComponentComponent, {
      width: '800px',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe((selectedOffice: any) => {
      if (selectedOffice) {
        this.model.office = selectedOffice.Office_Name;
        this.model.officeCode = selectedOffice.Office_code;
      }
    });
  }

  search(): void {
    if (this.model.office && this.model.cader) {
      // const apiUrl = `http://192.168.1.39:9090/api/v0/gen_queue_list?office_id=${this.model.officeCode}&cader=${this.model.cader}`;
      const apiUrl = `http://192.168.1.39:9090/api/v0/gen_queue_list?office_id=656&cader=MGR`;

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
  }
}
