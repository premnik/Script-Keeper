import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sql-script',
  templateUrl: './sql-script.component.html',
})
export class SqlScriptComponent implements OnInit {
  data: any[] = [];
  selectedKey = '';
  result: { description: string; script: string } | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadExcel();
  }

  loadExcel(): void {
    this.http.get('assets/scripts.xlsx', { responseType: 'arraybuffer' }).subscribe((data) => {
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      this.data = XLSX.utils.sheet_to_json(sheet);
    });
  }

  findScript(): void {
    const match = this.data.find((row) => row.Key === this.selectedKey);
    this.result = match ? { description: match.Description, script: match.Script } : null;
  }
}
