import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewOfficeModalComponentComponent } from '../view-office-modal-component/view-office-modal-component.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

interface Office {
  Office_Name: string;
  Office_code: string;
}

interface Cader {
  name: string;
  code: string;
}

interface TableData {
  slNo: number;
  office: string;
  officeCode: string;
  cader: string;
  caderCode: string;
  weight: number;
}

@Component({
  selector: 'app-office-cader',
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
    'slNo',
    'office',
    'officeCode',
    'cader',
    'caderCode',
    'weight',
  ];
  dataSource = new MatTableDataSource<TableData>([]);

  // ✅ Independent cader List (No Office Code Mapping)
  allCader: Cader[] = [
    { name: 'ASST', code: 'CADer001' },
    { name: 'AM', code: 'CADer002' },
    { name: 'MGR', code: 'CADer003' },
    { name: 'OA', code: 'CADer004' },
    { name: 'PTS', code: 'CADer005' },
    { name: 'Others', code: 'CADer006' },
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  selectText(event: Event): void {
    const dialogRef = this.dialog.open(ViewOfficeModalComponentComponent, {
      width: '800px',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe((selectedOffice: Office | undefined) => {
      if (selectedOffice) {
        this.model.office = selectedOffice.Office_Name;
        this.model.officeCode = selectedOffice.Office_code;
      }
    });
  }

  search(): void {
    if (this.model.office && this.model.cader) {
      const selectedCader = this.allCader.find(
        (emp) => emp.name === this.model.cader
      );

      const newEntry: TableData = {
        slNo: this.dataSource.data.length + 1,
        office: this.model.office,
        officeCode: this.model.officeCode,
        cader: this.model.cader, // Now it's just a string
        caderCode: selectedCader ? selectedCader.code : 'N/A', // Correct lookup
        weight: Math.floor(Math.random() * 100),
      };

      this.dataSource.data = [...this.dataSource.data, newEntry];
      this.dataSource.paginator = this.paginator;
    }
  }
}
